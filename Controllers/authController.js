module.exports = {
	login: function(req, res){
		if(req.isAuthenticated()){
			res.redirect('/home/'+req.user.firstName);
		}
		else{
		res.render('giraNautLP');
		}
	},

	loginSuccess: function(req, res){
		res.redirect('/home/'+req.user.firstName);
	},

	logout: function(req, res){
		req.logout();
		res.redirect('/');
		req.session.isGuide = null;
		req.session.applicationData = null;
		// req.session.destroy();
	},

	ensureAuthenticated: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect('/');
	},
};