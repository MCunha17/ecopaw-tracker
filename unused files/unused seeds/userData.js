const User  = require('../../models/User');

const userdata = [
    {
      "username": "user1",
      "password": "1234"
    },
    {
      "username": "user2",
      "password": "5678"
    },
    {
      "username": "user3",
      "password": "9123"
    }
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;