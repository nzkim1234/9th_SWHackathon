const path = require('path');
const fs = require('fs');

module.exports = {
    getQrImage : async (req, res, next) => {
        fs.rmSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`);
        res.send('respond with a resource');},

}