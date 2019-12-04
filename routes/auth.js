var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

var User = require('../database/handleUser');

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        User.findOrCreateUser(profile._json, function(user, err){
            if (err) throw err;
            console.log(accessToken);
            //console.log(refreshToken);
            console.log('namenenene')
            console.log(profile._json);
            console.log('namenenene')
            console.log(user);
            console.log(cb);
            return cb(user);
        })
    }
));

//this is the endpoint 
router.get('/google',
    // strategy is saved as 'google' in library
    passport.authenticate('google',
        // thats what we ask for (scope can be looked up)
        { scope: ['profile', 'email'] }
    )
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.send('Successful authentication, redirect home.');
        res.redirect('/');
    }
);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource from auth');
});

router.get('/login', function (req, res, next) {
    res.send('login unsuccessfull');
});

module.exports = router;
