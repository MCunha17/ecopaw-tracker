const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

// Render the login/signup page
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/homepage');
  } else {
    res.render('login');
  }
});

// Homepage route (protected with withAuth middleware)
router.get('/homepage', withAuth, (req, res) => {
  // Render the homepage template with loggedIn status and user information
  res.render('homepage', { loggedIn: req.session.loggedIn, user_name: req.session.username });
});

module.exports = router;