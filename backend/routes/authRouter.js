const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Endpoint User registration
router.post('/register', registerUser);

// Endpoint User login
router.post('/login', loginUser);

module.exports = router;
