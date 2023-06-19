const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');
const withAuth = require('../utils/auth');

// Render the login/signup page
router.get('/', (req, res) => {
  res.render('login');
});

// Handle login request
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginSuccessful = await authControllers.login(username, password);

    if (loginSuccessful) {
      // Redirect the user to the homepage
      res.redirect('/homepage');
    } else {
      // Handle login failure
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the login request' });
  }
});

// Handle signup request
router.post('/', authControllers.signup);

// Homepage route (protected with withAuth middleware)
router.get('/homepage', withAuth, (req, res) => {
  // Render the homepage template with loggedIn status and user information
  res.render('homepage', { loggedIn: req.session.loggedIn, user_name: req.session.username });
});

module.exports = router;