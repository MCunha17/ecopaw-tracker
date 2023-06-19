const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('login');
});

// Homepage route (protected with withAuth middleware)
router.get('/homepage', withAuth, (req, res) => {
  // Render the homepage template with loggedIn status and user information
  res.render('homepage', { loggedIn: req.session.loggedIn, user_name: req.session.username });
});

module.exports = router;