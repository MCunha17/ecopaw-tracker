const router = require('express').Router();
const { login, signup } = require('./controllers/authController');
const { calculateEmissionsMiddleware } = require('./controllers/carbonController');

// Authentication routes
router.post('/login', login);
router.post('/signup', signup);

// Calculate emissions API endpoint
router.post('/calculate-emissions', calculateEmissionsMiddleware);

module.exports = router;