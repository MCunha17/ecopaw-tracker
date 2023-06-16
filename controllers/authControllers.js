const router = require('express').Router();
const User = require('../models/User')

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username });

        if (!user || !user.checkPassword(password)) {
            return res.status(404).json({ error: 'Invalid username or password.' });
        } else {
            req.session.loggedIn = true;
            req.session.save();

            res.redirect('/home');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the login request' });
    }
};

const signup = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const newUser = await User.create({ username, password })
        if (newUser) {
            req.session.loggedIn = true;
            req.session.save();
        }
        
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