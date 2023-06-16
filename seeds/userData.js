const User  = require('../models/User');

const userdata = [
    {
      "username": "user1",
      "password": "password1"
    },
    {
      "username": "user2",
      "password": "password2"
    },
    {
      "username": "user3",
      "password": "password3"
    }
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;