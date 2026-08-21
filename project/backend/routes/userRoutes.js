const express = require('express');
const { saveUser, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/saveUser', saveUser);
router.get('/:email', getUser);

module.exports = router;