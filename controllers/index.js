const router = require('express').Router();

const authRoutes = require('./auth-routes');
const emissionsRoutes = require('./emissions-routes');
const homeRoutes = require('./home-routes');
const factsRoutes = require('./facts-routes');

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/emissions', emissionsRoutes);
router.use('/home', homeRoutes);
router.use('/facts', factsRoutes);

module.exports = router;