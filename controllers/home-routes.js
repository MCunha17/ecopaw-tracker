const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

// Login Route
//router.get('/', (req, res) => {
  //res.render('login');
//});

router.get('/', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    res.render('homepage', { loggedIn: true });
  }
});

module.exports = router;