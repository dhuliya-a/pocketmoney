const express = require('express');
const authController = require('../controllers/auth_controller');
const router = express.Router();

router.get('/signup',authController.getsignup);
router.post('/signup', authController.signup);

router.get('/login', authController.getlogin);
router.post('/login', authController.login);
module.exports = router;