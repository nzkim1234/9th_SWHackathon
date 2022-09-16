const express = require('express');
const router = express.Router();
const controller = require('../controllers/boxControl');   

router.post('/putinbox', controller.postInfoFromBox);
router.post('/find', controller.postEmptyBox);

module.exports = router;