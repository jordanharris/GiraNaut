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
		res.redirect('/apply/successful');
	},

	applicationSuccessful: function(req, res){
		console.log("test");
		res.render('appSuccess');
	}




}