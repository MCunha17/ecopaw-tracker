const router = require('express').Router();
const { User } = require('../models');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !user.checkPassword(password)) {
            return res.status(404).json({ error: 'Invalid username or password.' });
        }

        req.session.loggedIn = true;
        req.session.save();

        res.json({ message: 'Login successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the login request' });
    }
};

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(404).json({ error: 'Username already exists. Please choose a different username.' });
        }

        const newUser = new User({
            username,
            password,
        });
        await newUser.save();
        res.json({ message: 'Signup successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the signup request.' });
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy();
        res.json({ message: 'Logout successful.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the logout request. '});
    }
};

module.exports = { login, signup, logout };