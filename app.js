/**
 * Module dependencies.
 */

var express = require('express');
var controllersGiraNaut = require('./Controllers/applicationProcess');
var controllersTours = require('./Controllers/tours');
var authController = require('./controllers/authController');
var http = require('http');
var path = require('path');
var passport = require('passport');
var passportConfig = require('./config/passport');
var mongoose = require('mongoose');

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
app.use(express.session({secret: 'passport secret'}));
app.use(passport.initialize());
app.use(passport.session());


app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.configure(function(){
	mongoose.connect('mongodb://localhost/giranaut');
})

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
// app.get('/sign-up', controllersGiraNaut.signUp);
app.get('/apply', controllersGiraNaut.apply);
app.get('/apply/successful', controllersGiraNaut.applicationSuccessful);
app.get('/home/:name', authController.ensureAuthenticated, controllersTours.userHome);
// app.get('/guideshome', controllersTours.guidesHome);

app.post('/apply/submitted', controllersGiraNaut.applicationSubmitted);
// app.post('/logInSubmission', controllersTours.logIn);
// app.post('/signUpSubmission', controllersTours.signUp);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
