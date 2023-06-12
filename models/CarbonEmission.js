const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

CarbonEmission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    emissionValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'CarbonEmission',
    timestamps: true,
    underscored: true
  }
);

module.exports = CarbonEmission;
