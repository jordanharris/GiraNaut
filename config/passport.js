var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserSignInModel = require('../Models/signIn');

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(userid, done){
	UserSignInModel.findOne({_id:userid}, function(err, user){
		done(err, user);
	});
});
//facebookStrategy
var facebookStrategy = new FacebookStrategy({
	clientID: '222393557966150',
	clientSecret:'31097b12254f8816a18a39a7e477a620',
	callbackURL:'http://localhost:3000/facebook/callback',
	profileFields: ['id','name','first_name','last_name','location','displayName','username','gender', 'photos','emails','birthday']
}, function(accessToken, refreshToken, profile, done){
	// console.log(profile);

	UserSignInModel.findOne({userid:profile.id}, function(err, user){
		if(user){
			return done(err, user);
		}

		var newUser = new UserSignInModel({
			provider: profile.provider,
			userid: profile.id,
			firstName: profile._json.first_name,
			lastName: profile._json.last_name,
			name: profile._json.name,
			username: profile.username,
			displayName: profile.displayName,
			picture: profile.photos[0].value,
			email: profile.emails[0].value,
			gender: profile.gender,
			location: profile._json.location.name,
			birthday: profile._json.birthday,
		});
		newUser.save(function(err,doc){
			return done(err, doc);
		});
	});
});

//googleStrategy
var googleStrategy = new GoogleStrategy({
    clientID: '79006386870-tclatmuptd2uk7h0r746ckvu1vfc810p.apps.googleusercontent.com',
    clientSecret: 'EwngPUzeZB2RcumnKKci6J90',
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, function(accessToken, refreshToken, profile, done) {
  	console.log(profile);

    UserSignInModel.findOne({ userid: profile.id }, function(err, user) {
    	if(user){
      		return done(err, user);
  		}
  		var newUser = new UserSignInModel({
  			provider: profile.provider,
  			userid: profile.id,	
  			firstName: profile._json.given_name,
  			lastName: profile._json.family_name,
  			name: profile._json.name,
  			// username: ,
  			displayName: profile.displayName,
  			picture: profile.picture,
  			email: profile._json.email,
  			gender: profile._json.gender,
  			// location:,
  			// birthday: ,
  		});
  		newUser.save(function(err,doc){
  			return done(err, doc);
  		});
    });
});
passport.use(facebookStrategy);
passport.use(googleStrategy);