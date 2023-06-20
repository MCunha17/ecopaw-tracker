const router = require('express').Router();

// Import routes
const homeRoutes = require('./home-routes');
const emissionsRoutes = require('./emissions-routes');

// Import controllers
const authControllers = require('./authControllers');
const carbonController = require('./carbonController');

// Authentication routes
router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.post('/logout', authControllers.logout);

router.use('/', homeRoutes);
router.use('/emissions', emissionsRoutes);

// Calculate emissions API endpoint
router.post('/calculate-emissions', carbonController.calculateEmissions);

module.exports = router;