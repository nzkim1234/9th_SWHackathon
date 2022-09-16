const db = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    postRegisterForm: async (req, res, next) => {
        const [userId, userPwd, userName, userPhoneNumber, userEmail, userAddress, userAptNum] = [req.body.id, req.body.pwd, req.body.name, req.body.phoneNumber, req.body.email, req.body.address, req.body.aptNum];
        const hashedPwd = bcrypt.hashSync(userPwd, 10);
        db.query('SELECT * FROM member_table WHERE id=?', userId, (err, row) => {
            if (row.length > 0) {
                console.log(row);
                return res.status(400).end();
            }
            else {
                db.query('INSERT INTO member_table(`id`, `pwd`, `name`, `phoneNumber`, `email`, `address`, `aptNum`) VALUES(?, ?, ?, ?, ?, ?, ?)', [userId, hashedPwd, userName, userPhoneNumber, userEmail, userAddress, userAptNum], (err, row) => {
                    if(err) {
                        console.log(err) ;
                        return res.status(400).end();
                    }
                    else return res.status(200).end();
                })
            }
        })
    },
}