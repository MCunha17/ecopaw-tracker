const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'ecopaw_db',
  'root',
  '1234',

  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;