const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PolarBear extends Model {}

PolarBear.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    habitat: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'PolarBear',
    timestamps: true,
    underscored: true
  }
);

module.exports = PolarBear;