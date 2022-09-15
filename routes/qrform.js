const express = require('express');
const router = express.Router();
const controller = require('../controllers/qrform')

router.post('/', controller.postQrform);

module.exports = router;