const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

//user login
router.post('/login', controller.loginUser);

//user signup
router.post('/signup', controller.signupUser);

module.exports = router;