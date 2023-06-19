const express = require('express');
const router = express.Router();
const { calculateEmissions } = require('./carbonController');

router.post('/calculate-emissions', calculateEmissions);

module.exports = router;