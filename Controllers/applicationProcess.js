var giraNautLP = module.exports = {

	// home: function(req, res){
	// 	res.render('giraNautLP');
	// },

	// signUp: function(req, res){
	// 	res.render('signUp');
	// },

	apply: function(req, res){
		if(req.session.hasApplied){
			res.render('appSuccess');
		}
		else{
			res.render('apply');
		}
		
	},

	applicationSubmitted: function(req, res){
		res.render('guideFBoauth');
	},

	applicationSuccessful: function(req, res){
		res.render('appSuccess');
	}

}