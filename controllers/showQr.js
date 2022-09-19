const path = require('path');
const fs = require('fs');

module.exports = {
    getQrImage : async (req, res, next) => {
        const boxNum = req.query.boxNum;
        console.log(req);
        console.log(req.query)
        console.log(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`);
        const fileExist = (fs.existsSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`));
        if (fileExist){
            const image = fs.readFileSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`);
            return res.status(200).send(image);    
        }
        else {
            return res.status(400).end();
        }
    }
}
