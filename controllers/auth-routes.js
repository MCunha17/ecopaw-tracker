const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');

// GET Login route
router.get('/login', (req, res) => {
  res.render('login', { layout: 'main' });
});

// POST Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(400).json({ message: 'Incorrect username. Please try again!' });
      return;
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    // Set the user's session to indicate successful login
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.email = user.email;
      req.session.username = user.username;
      req.session.loggedIn = true;

      // Redirect the user to the homepage after successful login
      res.redirect('/homepage');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;