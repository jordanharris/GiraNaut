var giraNautLP = module.exports = {

	// home: function(req, res){
	// 	res.render('giraNautLP');
	// },

	// signUp: function(req, res){
	// 	res.render('signUp');
	// },

	apply: function(req, res){
		res.render('apply');
	},

	applicationSubmitted: function(req, res){
		console.log(req.body);
		// console.log(req.body.user.firstName);
		// req.user.applicationSubmitted = req.body;
		// req.user.save(function(err, doc){
		// 	res.redirect('apply/successful');
		// 	req.session.isGuide = null;
		// })
		res.redirect('/apply/successful');
	},

	applicationSuccessful: function(req, res){
		res.render('appSuccess');
	}

}