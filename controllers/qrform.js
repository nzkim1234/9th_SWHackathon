const qrcode = require('qrcode');
const path = require('path');
module.exports = {
    postQrform: (req, res, next)  => {
        qrcode.toFile(`${path.resolve(__dirname, "../public/images/")}/ ${req.body.box_num}.png`, JSON.stringify(req.body), (err) => {
                console.log(err);
                return res.status(400).end();
            })
        return res.status(200).end();
    }
}