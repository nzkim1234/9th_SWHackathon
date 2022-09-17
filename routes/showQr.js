const express = require('express');
const router = express.Router();
const controller = require('../controllers/showQr')

router.get('/', controller.getQrImage);

module.exports = router;