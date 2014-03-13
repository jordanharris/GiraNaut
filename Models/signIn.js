var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	provider: String,
	userid: String,
	firstName: String,
	lastName: String,
	name: String,
	username: String,
	displayName: String,
	profile: Object,
	picture: String,
	email: String,
	gender: String,
	location: String,
	birthday: String,
	isGuide: {
		type: Boolean,
		default: false
	},
	hasApplied: {
		type: Boolean,
		default: false
	},

	applicationData: {}
})

var signInData = module.exports = mongoose.model('user',userSchema);

	// logInEvent: function(formLogIn){
	// 	logInArray.push(formLogIn);	
	// },

	// signUpEvent: function(formSignUp){
	// 	signUpArray.push(formSignUp);
	// }