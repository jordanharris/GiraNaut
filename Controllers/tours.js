var modelSignIn = require('../Models/signIn');

var toursLP = module.exports = {

	userHome: function(req, res){
		res.cookie('userId',req.user._id.toString());
		if(req.session.isGuide && !(req.user.hasApplied)){
			req.user.isGuide = true;
			req.user.applicationData = req.session.applicationData;
			req.user.hasApplied = req.session.hasApplied;
			req.user.save(function(err, doc){
				res.redirect('apply/successful');
				req.session.isGuide = null;
			})
		}
		else if(req.user.hasApplied && !req.user.isGuide){
			res.redirect('apply/successful');
		}
		else if(req.user.isGuide){
			var allGuides = modelSignIn.findById({ _id: req.user._id}, function(err, docs) {
				res.render('guidesHome',{user:req.user});	
				for (var i = 0; i < req.user.messages.length; i++) {
					req.user.messages[i].loggedIn = true
				};
				req.user.save();
			// res.render('guidesHome',{user:req.user})
			});
		}
		else{
			var allGuides = modelSignIn.find({ isGuide: true }).populate('messages.from','', 'user').exec(function (err, docs) {
				res.render('toursHome',{
				user:req.user,
				bootstrap: docs
				});	
				for (var i = 0; i < req.user.messages.length; i++) {
					req.user.messages[i].loggedIn = true
				};
				req.user.save();
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