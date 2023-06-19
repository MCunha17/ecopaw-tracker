const router = require('express').Router();

const homeRoutes = require('./home-routes');
const emissionsRoutes = require('./emissions-routes');
const authControllers = require('./authControllers');
const carbonController = require('./carbonController');

// Authentication routes
router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);

// Use homeRoutes for the homepage route
router.use('/', homeRoutes);

// Use emissionsRoutes for the /emissions route
router.use('/emissions', emissionsRoutes);

// Calculate emissions API endpoint
router.post('/calculate-emissions', carbonController.calculateEmissions);

module.exports = router;