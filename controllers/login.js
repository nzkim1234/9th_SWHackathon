const db = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    loginForm: async (req, res, next) => {
        console.log(req.body)
        db.query('SELECT * FROM member_table WHERE id=?', req.body.id, (err, row) => {
            if(err) {
                console.log(err)
                return res.status(400).send(err);
            }

            if(row.length > 0){
                sendInfo = {
                    'seq' : row[0].seq,
                    'id' : row[0].id,
                    'name' : row[0].name,
                    'phoneNumber' : row[0].phoneNumber,
                    'email' : row[0].email,
                    'address' : row[0].address,
                    'aptNum' : row[0].aptNum,
                }
                bcrypt.compare(req.body.pwd, row[0].pwd, (err, result) => {
                    console.log(result)
                    if(result) {
                        return res.status(200).send(sendInfo);
                    }
                    else return res.status(400).send('wrong pwd');
                })
            }
            else {
                console.log('no ID');
                return res.status(400).send('no ID');
            }
        })
    },
}