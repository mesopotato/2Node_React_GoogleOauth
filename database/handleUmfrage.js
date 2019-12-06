const mysql = require('mysql');
const keys = require('../config/keys');

module.exports.insertUmfrage = function (umfrage) {
    //promisifiyng this because else it will make a mess 
    return new Promise(function (resolve, reject) {
        // db connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nodekurs'
        });
        connection.connect((err) => {
            if (err) return err;
            console.log('Connected!  ');
        });

        connection.query('INSERT INTO umfrage set ?', umfrage, (err, res) => {
            if (err) {
                return reject(err)
            } else {
                console.log('Last insert ID:', res.insertId);
                console.log('resolving ')
                resolve(res)
            }
        });
    })
}

module.exports.insertAllRecipients = function (recipients, fk_umfrage) {
    return new Promise(async function (resolve, reject) {
        // db connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nodekurs'
        });
        connection.connect((err) => {
            if (err) return reject(err);
            console.log('Connected!  ');
            // console.log();
        });

        // for checking duplicates
        let emailHashMap = {};

        //does a splitting and also the for loop lol
        var array = await recipients.split(',').map(email => {

            if (emailHashMap[email]) {
                // is duplicate 
                console.log('duplicate found :' + email);
            } else {
                //save for later 
                emailHashMap[email] = true;

                var recipient = {
                    recipient: email.trim(),
                    fk_umfrage: fk_umfrage,
                    answer: null
                }
                // userid is in user.sub .. could also be this search 
                connection.query('INSERT INTO recipient set ?', recipient, (err, res) => {
                    if (err) return reject(err);
                    console.log('Last insert ID:', res.insertId);
                    if (!err) {
                        console.log('inserted recipient ');
                    }
                });
            }
        })

        return resolve(array);
    })
}