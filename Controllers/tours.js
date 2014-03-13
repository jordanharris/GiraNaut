var gm = require('gm');
var modelSignIn = require('../Models/signIn');

var toursLP = module.exports = {

	userHome: function(req, res){
		if(req.session.isGuide && !(req.user.hasApplied)){
			req.user.isGuide = true;
			req.user.applicationData = req.session.applicationData;
			req.user.hasApplied = req.session.hasApplied;
			req.user.save(function(err, doc){
				console.log(err);
				res.redirect('apply/successful');
				req.session.isGuide = null;
			})
		}
		else if(req.user.hasApplied && !req.user.isGuide){
			res.redirect('apply/successful');
		}
		else if(req.user.isGuide){
			res.render('guidesHome',{user:req.user})
		}
		else{
			var allGuides = modelSignIn.find({ isGuide: true }, function (err, docs) {
				// for (var i = 0; i < docs.length; i++) {
				// 	docs[i].picture = JSON.stringify(gm(docs[i].picture).resize(50)); 
				// };
				res.render('toursHome',{
				user:req.user,
				bootstrap: docs
				});	
			});
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