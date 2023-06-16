const Donation = require('../models/Donation');

const donationData = [
    {
      amount: 100,
      date: new Date(),
      userId: 1
    },
    {
      amount: 50,
      date: new Date(),
      userId: 2
    },
    {
      amount: 200,
      date: new Date(),
      userId: 3
    }
  ];
  
const seedDonations = () => Donation.bulkCreate(donationData);

 module.exports = seedDonations; 