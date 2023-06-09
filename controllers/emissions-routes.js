const express = require('express');
const app = express();

// Emissions entry
app.post('/api/emissions', (req, res) => {
  const { userId, emissions } = req.body;

  // Validate
  if (!userId || !emissions) {
    return res.status(400).json({ error: 'Invalid entry.' });
  }

  // Placeholder: Save emissions entry to database

  // Success message
  res.status(200).json({ message: 'Entry successfully recorded.' });
});

// Retrive emissions history
app.get('/api/emissions', (req, res) => {
  const { userId } = req.query;
  // Validate
  if (!userId) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  // Placeholder: retrieve emissions history from database

  // Return emissions history
  // [] will be replaced with data
  res.status(200).json({ userId, emissionsHistory: [] });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});