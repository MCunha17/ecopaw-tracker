const express = require('express');
const router = express.Router();

// Login Route
router.get('/', (req, res) => {
  res.render('login');
});

router.get('/home', (req, res) => {
  res.render('homepage');
});

module.exports = router;