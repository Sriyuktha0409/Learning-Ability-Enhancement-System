const express = require('express');
const { saveTestResult } = require('../controllers/testController');

const router = express.Router();

router.post('/saveTestResult', saveTestResult);

module.exports = router;