var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

var User = require('../database/handleUser');

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: keys.CALLBACK_URL
    //, proxy : true if the callback is through a proxy 
},
    async (accessToken, refreshToken, profile, cb) => {

        var user = await User.findOrCreateUser(profile._json);
        return cb(null, user);
    }

));

passport.serializeUser(function (user, cb) {
    console.log('in SErialize USER__________________________________________USER');
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    console.log('in DEserialize USER__________________________________________USER');
    cb(null, obj);
});
