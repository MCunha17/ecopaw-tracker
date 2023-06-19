// Not currently using, should we delete?

const sequelize = require('../config/connection');

const seedUsers = require('./userData');
const seedDonations = require('./donationData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedDonations();

  process.exit(0);
};

seedAll(); 