const mysql = require('mysql');
const keys = require('../config/keys');


module.exports.findOrCreateUser = function (user) {
    //promisifiyng this because else it will make a mess 
    return new Promise(function (resolve, reject) {
        // db connection
        const connection = mysql.createConnection({
            host: keys.DATABASE_HOST,
            user: keys.DATABASE_USER,
            password: keys.DATABASE_PASSWORD,
            database: keys.DATABASE_NAME
        });
        connection.connect((err) => {
            if (err) return reject(err);
            console.log('Connected!');
            console.log(user);
        });
        // userid is in user.sub .. could also be this search 
        connection.query('SELECT * FROM user where email = ?', user.email, (err, rows, fields) => {
            console.log('err wäre' + err);
            if (err) return reject(err);
            // console.log('Data received from Db:\n');
            // console.log(rows);
            if (!err) {
                console.log('rows sind :' + rows[0]);
                if (rows[0] != undefined) {
                    console.log('not undefined rows[0')
                    resolve(rows[0])
                } else {
                    // put the insert object together 
                    var insert = {
                        name: user.name,
                        email: user.email,
                        picture: user.picture,
                        konto: 0
                    }
                    console.log('insert : ' + JSON.stringify(insert));
                    connection.query('INSERT INTO user set ?', insert, (err, res) => {
                        if (err) return reject(err);
                        console.log('Last insert ID:', res.insertId);
                        if (!err) {
                            console.log('callbacking ')
                            connection.query('SELECT * FROM user where id = ?', res.insertId, (err, rows, fields) => {
                                console.log('err wäre' + err);
                                if (err) return reject(err);
                                // console.log('Data received from Db:\n');
                                // console.log(rows);
                                if (!err) {
                                    console.log('rows sind :' + rows[0]);
                                    if (rows[0] != undefined) {
                                        console.log('not undefined rows[0')
                                        resolve(rows[0])
                                    }
                                }
                            })
                        }
                    });
                }
            }
        });
    })
}
module.exports.findUser = function (_json) {
    return new Promise(function (resolve, reject) {

        // db connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nodekurs'
        });
        connection.connect((err) => {
            if (err) return reject(err);
            console.log('Connected! _json ist: ');
            console.log(_json);
        });
        // userid is in user.sub .. could also be this search 
        connection.query('SELECT * FROM user where email = ?', _json.email, (err, rows, fields) => {
            console.log('err wäre' + err);
            if (err) return reject(err);
            // console.log('Data received from Db:\n');
            // console.log(rows);
            if (!err) {
                resolve(rows[0])
            }
        });
    })
}

module.exports.updateUserCredit = function (amount, id) {
    return new Promise(function (resolve, reject) {

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
            //console.log(_json);
        });
        connection.query('UPDATE user set konto = ? where id = ?', [amount, id], (err, result) => {
            if (err) return reject(err);
            // console.log('Data received from Db:\n');
            // console.log(rows);
            if (!err) {
                resolve(result);
            }
        })
    })
}
