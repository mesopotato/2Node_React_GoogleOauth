var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middlewares/requireLogin');
var ensureCredit = require('../middlewares/requireCredit');
var Umfrage = require('../database/handleUmfrage');
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
        umfrage : umfrage,
        recipients : recipients
    }
    // in the template we define the html 
    const mailer = new Mailer(mailObject, umfrageTemplate(umfrage));
    mailer.send();

    Umfrage.insertUmfrage(umfrage, (response, err) => {
        if (err) {
            console.log(err);
            throw err;
        }
       // console.log(response);
        Umfrage.insertAllRecipients(recipients, response.insertId, (response, err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            res.send(umfrage);
        })
    })
});

module.exports = router;