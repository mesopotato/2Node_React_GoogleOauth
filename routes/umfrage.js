var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middlewares/requireLogin');
var ensureCredit = require('../middlewares/requireCredit');
var Umfrage = require('../database/handleUmfrage');
var User = require('../database/handleUser');
var passport = require('passport');
var Mailer = require('../services/Mailer');
var umfrageTemplate = require('../services/emailTemplates/umfrageTemplate');

// middlewares are executed one after another 
router.post('/', ensureAuthenticated, ensureCredit, async function (req, res) {
    //router.post('/',  async function (req, res) {
    // authorized id :
    console.log(req.body.title);

    var umfrage = {
        title: req.body.title,
        subject: req.body.subject,
        body: req.body.body,
        fk_user: req.user.id
    };
    //kann auch so herausgenommen werden?
    const { recipients } = req.body;
    console.log(recipients);

    //Mailer
    //var array = recipients.split(',').map(email => {email})

    var mailObject = {
        umfrage: umfrage,
        recipients: recipients
    }
    // in the template we define the html 
    const mailer = new Mailer(mailObject, umfrageTemplate(umfrage));

    // wait to complete and save  to DB 
    //await mailer.send();

    var response = await Umfrage.insertUmfrage(umfrage);
    await Umfrage.insertAllRecipients(recipients, response.insertId);
    req.user.konto -= 500;
    var user = req.user;
    await User.updateUserCredit(req.user.konto, req.user.id);

    // this is needed to send the updated object to the session :)
    passport.serializeUser(function (user, cb) { cb(null, user); });
    passport.deserializeUser(function (user, cb) { cb(null, user); });
    // and the user is logged out .. that needs to be fixed 
    req.logIn(req.user, function (err) {
        if (err) { return (err); }
        console.log('login with user : '+ JSON.stringify(user));
        //return res.send(user, umfrage);
        return res.send(user);
    });


    // // change please to async :( else we have this nested bullcrap
    // Umfrage.insertUmfrage(umfrage, (response, err) => {
    //     if (err) {
    //         console.log(err);
    //         throw err;
    //     }
    //     // console.log(response);
    //     Umfrage.insertAllRecipients(recipients, response.insertId, (response, err) => {
    //         if (err) {
    //             console.log(err);
    //             throw err;
    //         }

    //         // bill the client & update the kontostand in the sessionobject 
    //         // here not per email but per request soooo its pauschal 
    //         req.user.konto -= 500;

    //         User.updateUserCredit(req.user.konto, req.user.id, async (response, err) => {
    //             if (err) throw err;
    //             var user = req.user;
    //             console.log('logging the user object' + JSON.stringify(req.user));

    //             // this is needed to send the updated object to the session :)
    //             passport.serializeUser(function (user, cb) { cb(null, user); });
    //             passport.deserializeUser(function (user, cb) { cb(null, user); });
    //             // and the user is logged out .. that needs to be fixed 
    //             req.logIn(req.user, function (err) {
    //                 if (err) { return (err); }
    //                 console.log('login with user : '+ JSON.stringify(user));
    //                 return res.send(user, umfrage);
    //             });
    //         });
    //        // res.send(umfrage);
    //     })
    // })
});

module.exports = router;