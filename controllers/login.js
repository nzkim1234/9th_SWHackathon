const db = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    loginForm: async (req, res, next) => {
        console.log(req.body)
        db.query('SELECT * FROM member_table WHERE id=?', req.body.id, (err, row) => {
            if(err) {
                console.log(err)
                return res.status(400).end();
            }

            if(row.length > 0){
                console.log(row[0].pwd)
                bcrypt.compare(req.body.pwd, row[0].pwd, (err, result) => {
                    console.log(result)
                    if(result) {return res.status(200).end();}
                    else return res.status(400).end();
                })
            }
            else {
                console.log('no ID');
                return res.status(400).end();
            }
        })
    },
}