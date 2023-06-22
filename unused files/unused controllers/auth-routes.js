const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/authControllers');

// Route for logging in
router.post('/login', authControllers.login);

// Route for signing up
router.post('/signup', authControllers.signup);

module.exports = router;