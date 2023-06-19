const router = require('express').Router();
const User = require('../models/User');

const authControllers = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

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

      req.session.user_id = user.id;
      req.session.loggedIn = true;

      res.redirect('/homepage');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the login request' });
    }
  },

  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the username is already taken
      const existingUser = await User.findOne({ where: { username } });

      if (existingUser) {
        res.status(400).json({ message: 'Username already exists. Please choose a different username!' });
        return;
      }

      const newUser = await User.create({ username, email, password });

      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.redirect('/homepage');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the signup request' });
    }
  }
};

module.exports = authControllers;