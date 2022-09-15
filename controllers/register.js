const db = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    postRegisterForm: async (req, res, next) => {
        bcrypt.hash(req.body.pwd, 10, (error, hash) => {
            db.query('INSERT INTO user(`id`, `pwd`) VALUES(?, ?)', [req.body.id, hash], (err, row) => {
                if(err) {
                    console.log(err) ;
                    return res.status(400).end();
                }
            })
        })
        return res.status(200).end();
    },
}