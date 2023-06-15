const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database/connection');

class User extends Model {
  // Add custom methods?
  
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
    modelName: 'User',
    timestamps: true,
    underscored: true
  }
);

module.exports = User;
