const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');

router.get('/', (req, res) => {
    res.render('login');
  });

// Register route
router.post('/signup', authControllers.signup);

// Login route
router.post('/', authControllers.login);

router.post('/logout', authControllers.logout);

module.exports = router;