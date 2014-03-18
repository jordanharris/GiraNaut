var modelSignIn = require('../Models/signIn');



var toursLP = module.exports = {

	update: function(req, res){
		// console.log(req.body);
		var guideUpdate = {};
		// console.log(req.body.name)
		// console.log(req.body)
		guideUpdate[req.body.name] = req.body.value;
		var updateGuideProfile = modelSignIn.findByIdAndUpdate(req.user._id, guideUpdate, function(err, doc){
			// console.log(err);
			if(err === null){
				res.send(200)
			}
			else{
				res.send(400, "Please try again")
			}
		})
	}


}