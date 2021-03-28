const Sequelize = require('sequelize');
const { getAllVehicles } = require('../controllers/vehicles');

const sequelize = require('../database');
const VehicleMake = require("./vehiclemake");
const VehicleModel = require("./vehiclemodel")
const BodyType = require("./bodytype")

const vehicle = sequelize.define('vehicle', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  reg_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  weight: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  mileage: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},{
  timestamps: true,
});

vehicle.belongsTo(VehicleMake); //vehiclemakeId
vehicle.belongsTo(VehicleModel);
vehicle.belongsTo(BodyType);

module.exports = vehicle;
