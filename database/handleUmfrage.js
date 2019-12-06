const mysql = require('mysql');
const keys = require('../config/keys');

module.exports.insertUmfrage = function (umfrage, callback) {

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
        // console.log();
    });

    // object
    // umfrage = {
    //     title
    //     subject
    //     body
    //     fk_user
    // }

    // userid is in user.sub .. could also be this search 
    connection.query('INSERT INTO umfrage set ?', umfrage, (err, res) => {
        if (err) throw err;
        console.log('Last insert ID:', res.insertId);
        if (!err) {
            console.log('callbacking ')
            callback(res)
        }
    });
}

module.exports.insertAllRecipients = async function (recipients, fk_umfrage, callback) {

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
        // console.log();
    });

    //does a splitting and also the for loop lol
    var array = await recipients.split(',').map(email => {
        var recipient = {
            recipient: email.trim(),
            fk_umfrage: fk_umfrage,
            answer: null
        }
        // userid is in user.sub .. could also be this search 
        connection.query('INSERT INTO recipient set ?', recipient, (err, res) => {
            if (err) throw err;
            console.log('Last insert ID:', res.insertId);
            if (!err) {
                console.log('inserted recipient ');
            }
        });
    })
    callback(array);
}