const router = require('express').Router();

const authRoutes = require('./auth-routes');
const emissionsRoutes = require('./emissions-routes');
const homeRoutes = require('./home-routes');
const factsRoutes = require('./facts-routes');
const carbonController = require('./carbonController');

// Use homeroutes for the homepage route
router.use('/', homeRoutes);

// Calculate emissions API endpoint
router.post('/calculate-emissions', carbonController.calculateEmissions);
router.use('/emissions', emissionsRoutes);

router.use('/', authRoutes);
router.use('/facts', factsRoutes);

module.exports = router;