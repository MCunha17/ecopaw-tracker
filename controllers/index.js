const router = require('express').Router();

const authControllers = require('./authControllers');
const emissionsRoutes = require('./emissions-routes');
const homeRoutes = require('./home-routes');
const factsRoutes = require('./facts-routes');
const carbonController = require('./carbonController');

router.use('/auth', authControllers.login);
router.use('/emissions', emissionsRoutes);
router.use('/home', homeRoutes);
router.use('/facts', factsRoutes);
router.post('/api/emissions', carbonController.calculateEmissions);

module.exports = router;