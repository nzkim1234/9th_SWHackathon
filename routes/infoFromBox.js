const express = require('express');
const router = express.Router();
const controller = require('../controllers/openBox');   

router.get('/', controller.getOpenBox);

module.exports = router;