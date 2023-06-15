const express = require('express');
const app = express();
const mysql = require('mysql');

// Get polar bear fact
app.get('/api/polar-bear-facts', (req, res) => {
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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});