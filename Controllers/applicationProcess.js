var giraNautLP = module.exports = {

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