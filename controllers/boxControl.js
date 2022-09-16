const db = require('../config/config');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = {
    postInfoFromBox : async (req, res, next) => {
        const [boxNum, boxAptNum] = [req.body.boxNum, req.body.aptNum];
        db.query('SELECT name FROM member_table WHERE aptNum=?', boxAptNum, (err, row) => {
            if (err) return res.status(400).end();

            if (row.length > 0) {
                const boxName = row[0].name;
                db.query('UPDATE box_table SET boxNum = ?, boxEmpty = ?, boxPwd = ?, boxAptNum = ?, ownerName = ?, updatedDate = CURRENT_TIMESTAMP WHERE boxNum = ?', [boxNum, 1, 1234, boxAptNum, boxName, boxNum], (err, row) =>{
                    if (err) return res.status(400).end();

                    if (row) {
                        const qrData = {
                            "boxNum" : boxNum,
                            "aptNum" : boxAptNum,
                            "ownerName" : boxName
                        };
                        qrcode.toFile(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`, JSON.stringify(qrData), (err) => {
                            if (err) return res.status(400).end();
                            
                            else {
                                console.log(JSON.stringify(qrData));
                                return res.status(200).end();
                            }
                        })
                    }
                });     
            }

            else {
                return res.status(400).end();
            }
        });
    },

    postQrInfoFromBox : async (req, res, next) => {
        const [boxName, boxNum, boxAptNum] = [req.body.ownerName, req.body.boxNum, req.body.aptNum];
        const fileExist = (fs.existsSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`));
        if (fileExist){
            fs.rmSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`);
            db.query('UPDATE box_table SET boxNum = ?, boxEmpty = ?, boxPwd = ?, boxAptNum = ?, ownerName = ?, updatedDate = ? WHERE boxNum = ?', [boxNum, 0, null, null, null, null, boxNum], (err, row) =>{
                if (err) return res.status(400).end();

                if (row) return res.status(200).send({ openedbox : boxNum});
                else return res.status(400).end();
            });
        }
        else return res.status(400).end();
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