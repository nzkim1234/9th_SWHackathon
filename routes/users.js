const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
/* GET users listing. */
router.get('/', controller.getUserPage);

module.exports = router;
