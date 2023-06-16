const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');

// Register route
router.post('/signup', authControllers.signup);

// Login route
router.post('/login', authControllers.login);

router.post('/logout', authControllers.logout);

module.exports = router;