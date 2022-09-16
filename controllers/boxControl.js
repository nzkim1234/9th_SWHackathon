const db = require('../config/config');
const qrcode = require('qrcode');
const path = require('path');

module.exports = {
    postInfoFromBox : async (req, res, next) => {
        const [boxName, boxNum, boxAptNum] = [req.body.name, req.body.boxNum, req.body.aptNum];
        console.log(boxName);

        db.query('UPDATE box_table SET boxNum = ?, boxEmpty = ?, boxPwd = ?, boxAptNum = ?, ownerName = ?, updatedDate = CURRENT_TIMESTAMP WHERE boxNum = ?', [boxNum, 1, 1234, boxAptNum, boxName, boxNum], (err, row) =>{
            if (err) return res.status(400).end();
            
            if (row) {
                qrcode.toFile(`${path.resolve(__dirname, "../public/images/")}/ ${boxNum}.png`, JSON.stringify(req.body), (err) => {
                    if (err) console.log(err);
                    else return res.status(200).end();
                });
            }
            else return res.status(400).end();
        });
    },

    postEmptyBox : async (req, res, next) => {
        db.query('SELECT * FROM box_table WHERE boxEmpty=?', req.body.find, (err, row) => {
            console.log(row);
            if (err) {
                return res.status(400).end();
            }

            if (row.length > 0) {
                return res.status(200).send({ emptyBox : row[0].boxNum});
            }
            else {
                return res.status(400).send({emptyBox : 0});
            }
            
        })
    }
}