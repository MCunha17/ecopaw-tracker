const express = require('express');
const app = express();

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to EcoPaw!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});