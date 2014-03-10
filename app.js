/**
 * Module dependencies.
 */

var express = require('express');
var controllersGiraNaut = require('./Controllers/giraNaut');
var controllersTours = require('./Controllers/tours');
var http = require('http');
var path = require('path');
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

app.get('/', controllersGiraNaut.home);
app.get('/sign-up', controllersGiraNaut.signUp);
app.get('/apply', controllersGiraNaut.apply);
app.get('/apply/successful', controllersGiraNaut.applicationSuccessful);
app.get('/home', controllersTours.userHome);
app.get('/guideshome', controllersTours.guidesHome);

app.post('/apply/submitted', controllersGiraNaut.applicationSubmitted);
app.post('/logInSubmission', controllersTours.logIn);
app.post('/signUpSubmission', controllersTours.signUp);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
