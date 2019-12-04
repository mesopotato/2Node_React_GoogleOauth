const mysql = require('mysql');


module.exports.findOrCreateUser = function (user, callback) {

    // db connection
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodekurs'
    });
    connection.connect((err) => {
        if (err) return err;
        console.log('Connected!');
        console.log(user);
    });
    // userid is in user.sub .. could also be this search 
    connection.query('SELECT * FROM user where email = ?', user.email, (err, rows, fields) => {
        console.log('err wäre' + err);
        if (err) return err;
        // console.log('Data received from Db:\n');
        // console.log(rows);
        if (!err) {
            console.log('rows sind :' + rows[0]);
            if (rows[0] != undefined) {
                console.log('not undefined rows[0')
                callback(rows[0])
            } else {
                // put the insert object together 
                var insert = {
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                }
                console.log('insert : ' + JSON.stringify(insert));
                connection.query('INSERT INTO user set ?', insert, (err, res) => {
                    if (err) throw err;
                    console.log('Last insert ID:', res.insertId);
                    if (!err) {
                        console.log('callbacking ')
                        callback(res)
                    }
                });
            }
        }
    });
}
module.exports.findUser = function (_json, callback) {

    // db connection
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodekurs'
    });
    connection.connect((err) => {
        if (err) return err;
        console.log('Connected! _json ist: ');
        console.log(_json);
    });
    // userid is in user.sub .. could also be this search 
    connection.query('SELECT * FROM user where email = ?', _json.email, (err, rows, fields) => {
        console.log('err wäre' + err);
        if (err) return err;
        // console.log('Data received from Db:\n');
        // console.log(rows);
        if (!err) {
            callback(rows[0])
        }
    });
}
