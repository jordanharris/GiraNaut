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
	picture: {
		type: String,
		default: "http://lorempixel.com/200/200/nature/1"
	},
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
	age:{
		type: Number,
		default: 21
	},
	language:{
		type: String,
		default: 'Fluent In'
	},
	landmarks:{
		type: String,
		default: 'Favorite City Landmark'
	},
	bio:{
		type: String,
		default: 'About me'
	},
	messages: [
		{
			to: mongoose.Schema.ObjectId,
			from: mongoose.Schema.ObjectId,
			message: String,
			time: String,
			date: { type: Date, default: Date.now },
			loggedIn: Boolean

		}
	], 
	applicationData: {}
})

var signInData = module.exports = mongoose.model('user',userSchema);