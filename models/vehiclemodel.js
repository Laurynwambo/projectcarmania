const Sequelize = require('sequelize');

const sequelize = require('../database');
const VehicleMake = require("./vehiclemake")

const vehiclemodel = sequelize.define(
  'vehiclemodel',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    updatedBy: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// vehiclemodel.belongsTo(VehicleMake)

module.exports = vehiclemodel;
