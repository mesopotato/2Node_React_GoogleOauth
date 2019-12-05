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
    (accessToken, refreshToken, profile, cb) => {

        User.findOrCreateUser(profile._json, function (user, err) {
            if (err) {
                console.log('callback has err + ' + err);
                //done(err, null);
            } else {
                console.log(accessToken);
                //console.log(refreshToken);
                console.log('namenenene')
                console.log(profile._json);
                console.log('user object')
                console.log(user);
                //console.log(cb);
                //done(null, user);
                return cb(err, user);
            }
        })
        // console.log('hei there returning profile ')
        // return cb(null, profile)
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
