var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	userid: String,
	first_name: String,
	last_name: String,
	name: String,
	username: String,
	displayName: String,
	profile: Object,
	picture: String,
	email: String,
	gender: String,
	locale: String,
	birthday: String
})

var signInData = module.exports = {

	logInEvent: function(formLogIn){
		logInArray.push(formLogIn);	
	},

	signUpEvent: function(formSignUp){
		signUpArray.push(formSignUp);
	}

} 