var modelSignIn = require('../Models/signIn');

var toursLP = module.exports = {

	userHome: function(req, res){
		res.render('toursHome');
	},

	guidesHome: function(req, res){
		res.render('guidesHome');
	},

	logIn: function(req, res){
		var logInSubmissions = req.body.logInSubmission;
		var logInArray	= modelSignIn.logInEvent(logInSubmissions);
		res.redirect('/home');
	},

	signUp: function(req, res){
		var signUpSubmissions = req.body.signUpSubmission;
		var signUpArray = modelSignIn.signUpEvent(signUpSubmissions);
		res.redirect('/home');
	}

}