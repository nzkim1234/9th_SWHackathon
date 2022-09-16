const qrcode = require('qrcode');
const path = require('path');

module.exports = {
    postQrform: (req, res, next)  => {
        console.log(JSON.stringify(req));
        console.log(path.resolve(__dirname, "../public/images/"));
        qrcode.toFile(`${path.resolve(__dirname, "../public/images/")}/ ${req.boxNum}.png`, JSON.stringify(req), (err) => {
                console.log(err);
                return res.status(400).end();
            })
        return res.status(200).end();
    }
}