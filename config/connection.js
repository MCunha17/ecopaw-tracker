const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'ecopaw_db',
  'root',
<<<<<<< HEAD
  '1234',

=======
  'Peyton3232!',
>>>>>>> caab48533bf3db990967aa40ab48d1e91465c48b
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;