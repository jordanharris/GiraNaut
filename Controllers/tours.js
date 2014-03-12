var modelSignIn = require('../Models/signIn');

var toursLP = module.exports = {

	userHome: function(req, res){
		if(req.session.isGuide){
			// req.user.isGuide = true;
			console.log(req.body);
			res.redirect('apply/successful');
			req.session.isGuide = null;
		}
		else if(req.user.isGuide){
			res.render('guidesHome',{user:req.user})
		}
		else{
			res.render('toursHome',{user:req.user});
		}
	},

	// guidesHome: function(req, res){
	// 	res.render('guidesHome');
	// }

	// logIn: function(req, res){
	// 	var logInSubmissions = req.body.logInSubmission;
	// 	var logInArray	= modelSignIn.logInEvent(logInSubmissions);
	// 	res.redirect('/home');
	// },

	// signUp: function(req, res){
	// 	var signUpSubmissions = req.body.signUpSubmission;
	// 	var signUpArray = modelSignIn.signUpEvent(signUpSubmissions);
	// 	res.redirect('/home');
	// }

}