var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middlewares/requireLogin');
var ensureCredit = require('../middlewares/requireCredit');
var Umfrage = require('../database/handleUmfrage');

// middlewares are executed one after another 
router.post('/', ensureAuthenticated, ensureCredit, async function (req, res) {
    // authorized id :
    console.log(req.body.title);

    var umfrage = {
        title: req.body.title,
        subject: req.body.subject,
        body: req.body.body,
        fk_user: req.user.id,
        Def_TSD: NOW()
    };

    const { recipients } = req.body;
    console.log(recipients);

    Umfrage.insertUmfrage(umfrage, (response, err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        Umfrage.insertAllRecipients(recipients, response.id, (response, err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            res.send(umfrage);
        })
    })
});

module.exports = router;