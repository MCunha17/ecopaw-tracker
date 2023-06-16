const express = require('express');
const router = express.Router();
const { calculateEmissions } = require('./carbonController');

// Login Route
router.get('/', (req, res) => {
  res.render('login');
});

// Render the home page
router.get('/homepage', async (req, res) => {
  try {
    const emissionsData = await calculateEmissions(req, res);
    res.render('homepage', { loggedIn: req.session.loggedIn, user_name: req.session.user_name, emissionsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating emissions' });
  }
});

router.post('/calculateEmissions', calculateEmissions);

module.exports = router;