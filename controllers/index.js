const db = require('../config/config');

module.exports = {
    postMainPage: async (req, res, next) => {
        seq = req.body.seq;
        db.query('SELECT * FROM member_table WHERE seq=?', seq, (err, row) => {
            if (err) return res.status(400).end();
            console.log(row[0]);
            if (row.length > 0) {
                const [userId, userName, userPhoneNumber, userEmail, userAddress, userAptNum] = [row[0].id, row[0].name, row[0].phoneNumber, row[0].email, row[0].address, row[0].aptNum];
                db.query('SELECT boxNum, boxEmpty, ownerName, updatedDate FROM box_table ', (err, row) => {
                    if (err) return res.status(400).end();

                    if (row.length > 0) {
                        console.log(JSON.stringify(row));
                        console.log(row[0].updatedDate)
                        return res.status(200).json(row);
                    }
                    else return res.status(400).end();
                });
            }
            else {
                return res.status(400).end();
            }
        });
    }
}