var express = require('express');
var router = express.Router();
var keys = require('../config/keys');
var passport = require('passport');
var stripe = require('stripe')(keys.STRIPE_SECRET_KEY);
var ensureAuthenticated = require('../middlewares/requireLogin');

var User = require('../database/handleUser');

router.post('/stripe', ensureAuthenticated, async function (req, res) {
    // authorized id :
    console.log(req.body.id);

    // bill the card // amount has to me smaller or equal to what was requested 
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: 'description from backend',
        source: req.body.id
    });
    // update the kontostand in the sessionobject 
    req.user.konto += 500;

    User.updateUserCredit(req.user.konto, req.user.id, (response, err) => {
        if (err) throw err;
        var user = req.user;

        // this is needed to send the updated object to the session :)
        passport.serializeUser(function (user, cb) { cb(null, user); });
        passport.deserializeUser(function (user, cb) { cb(null, user); });
        // and the user is logged out .. that needs to be fixed 
        req.logIn(req.user, function (err) {
            if (err) { return (err); }
            return res.send(user);
        });
    });
});

module.exports = router;