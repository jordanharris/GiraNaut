/**
 * Module dependencies.
 */

var express = require('express');
var controllersGiraNaut = require('./Controllers/applicationProcess');
var controllersTours = require('./Controllers/tours');
var authController = require('./Controllers/authController');
var guidesController = require('./Controllers/guidesController');
var chatController = require('./Controllers/chatController');
var modelSignIn = require('./Models/signIn');
var http = require('http');
var path = require('path');
var passport = require('passport');
var passportConfig = require('./config/passport');
var socketio = require('socket.io');
var mongoose = require('mongoose');
var cookie = require('cookie');
var connect = require('connect');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//passport
app.use(express.cookieParser());
app.use(express.session({secret: 'secret',  key: 'express.sid'}));
app.use(passport.initialize());
app.use(passport.session());


app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.configure(function(){
// 	mongoose.connect('mongodb://localhost/giranaut');
// })

//passport-facebook
app.get('/login/facebook', passport.authenticate('facebook', {scope: ['user_birthday', 'email'] }));
app.get('/apply/facebook', function(req, res, next){
		req.session.isGuide = true;
		next();
	},
	passport.authenticate('facebook', {scope: ['user_birthday', 'email'] }));
app.get(
	'/facebook/callback',
	passport.authenticate('facebook', {failureRedirect: '/'}),
	authController.loginSuccess
);

//passport-google
app.get('/login/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
                                            'https://www.googleapis.com/auth/userinfo.email'] }));
app.get(
	'/auth/google/callback', 
  	passport.authenticate('google', {failureRedirect: '/' }),
  	authController.loginSuccess
);

//passport-twitter
app.get('/login/twitter', passport.authenticate('twitter'));
app.get(
	'/auth/twitter/callback', 
  	passport.authenticate('twitter', {failureRedirect: '/' }),
  	authController.loginSuccess
);


app.get('/', authController.login);
app.get('/logout',authController.logout);
app.get('/apply', controllersGiraNaut.apply);
app.get('/apply/successful', controllersGiraNaut.applicationSuccessful);
app.get('/home/:name', authController.ensureAuthenticated, controllersTours.userHome);
app.get('/userDoc', chatController.find);

app.post('/apply/authenticate',function(req, res, next){
		req.session.applicationData = req.body;
		req.session.hasApplied = true;
		next();
	}, controllersGiraNaut.applicationSubmitted);
app.post('/guide/update', guidesController.update);

//Create Server
var server = http.createServer(app);

// sets the log level of socket.io, with
// log level 2 we wont see all the heartbits
// of each socket but only the handshakes and
// disconnections
// io.set('log level', 2);

// setting the transports by order, if some client
// is not supporting 'websockets' then the server will
// revert to 'xhr-polling' (like Comet/Long polling).
// for more configurations go to:
// https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
// io.set('transports', [ 'websocket', 'xhr-polling' ]);

//Start the web socket server
var io = socketio.listen(server);

var users = {};

//set authorization to grab user cookie ID

io.set('authorization', function (handshakeData, accept) {
  if (handshakeData.headers.cookie) {
    handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
    handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');

    // console.log(cookie.parse(handshakeData));
    if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
      return accept('Cookie is invalid.', false);
    }
  } else {
    return accept('No cookie transmitted.', false);
  } 

  accept(null, true);
});

//If the client just connected
io.sockets.on('connection', function(socket) {
	users[socket.handshake.cookie.userId] = socket;
	socket.on('disconnect', function(){
	    users[socket.handshake.cookie.userId] = null;
	});
	socket.on('message', function(data){
		// console.log(data);
		if(users[data.to]){
			modelSignIn.findById(data.to, function(err, doc){
				doc.messages.push({from: data.from, to: data.to, message: data.message, time: data.timestamp , date: new Date(), loggedIn: true});
				doc.markModified('messages');
				doc.save(function(err){
				});
			});
			modelSignIn.findById(data.from, function(err, doc){
				doc.messages.push({to: data.to, from: data.from, message: data.message, time: data.timestamp , date: new Date(), loggedIn: true});
				doc.markModified('messages');
				doc.save(function(err){
					users[data.to].emit('message', data);
				});
			});
		}
		else{
			modelSignIn.findById(data.to, function(err, doc){
				doc.messages.push({from: data.from, to: data.to, message: data.message, time: data.timestamp , date: new Date(), loggedIn: false});
				doc.markModified('messages');
				doc.save(function(err){});
			});
			modelSignIn.findById(data.from, function(err, doc){
				doc.messages.push({to: data.to, from: data.from, message: data.message, time: data.timestamp , date: new Date(), loggedIn: true});
				doc.markModified('messages');
				doc.save(function(err){
				});
			});
		}
	});
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});