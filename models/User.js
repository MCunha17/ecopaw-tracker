// Import necessary modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

// Define User model
class User extends Model {
  async checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

// Initialize User model with attributes
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    hooks: {
      // Hash the password before storing it
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      // Hash the password before updating it
      beforeUpdate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Export User model
module.exports = User;