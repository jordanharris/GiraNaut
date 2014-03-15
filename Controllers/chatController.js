var modelSignIn = require('../Models/signIn');

var toursLP = module.exports = {

	find: function(req, res){
		var findUser = modelSignIn.findOne({userid:req.user.userid}, function(err, doc){
			res.send(doc);
		})
	}

}