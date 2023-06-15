const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const withAuth = require('../utils/auth');

// Get polar bear fact
router.get('/api/polar-bear-facts', withAuth, (req, res) => {
  // Query database to retrieve a random polar bear fact
  const query = 'SELECT fact FROM polar_bear_facts ORDER BY RAND() LIMIT 1';

  connection.query(query, (error, results) => {
    if (error) {
      // Error response
      console.error('Error retrieving polar bear fact:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the polar bear fact' });
    } else {
      // Polar bear fact is sent as JSON response
      if (results.length > 0) {
        const randomFact = results[0].fact;
        res.status(200).json({ fact: randomFact });
      } else {
        res.status(404).json({ error: 'No polar bear facts found' });
      }
    }
  });
});

module.exports = router;