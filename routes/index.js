const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')

/* GET home page. */

router.get('/', controller.getMainPage);

module.exports = router;
