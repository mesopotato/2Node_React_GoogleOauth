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

    connection.query('SELECT * FROM user where email = ?', user.email, (err, rows, fields) => {
        console.log('err wäre' +err);
        if (err) return err;
       // console.log('Data received from Db:\n');
       // console.log(rows);
        if (!err) {
            console.log('rows sind :'+ rows[0]);
            if (rows[0] != undefined){
                console.log('not undefined rows[0')
                callback(rows[0])
            } else {
                var insert = {
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                }
                console.log('insert : ' +JSON.stringify(insert));
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