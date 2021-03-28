const Sequelize = require('sequelize');

const sequelize = require('../database');
const VehicleModel = require("./vehiclemodel")
const User = require("./user")

const vehiclemake = sequelize.define('vehiclemake', {
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
},{
  timestamps: true,
});

vehiclemake.belongsTo(User,{ as:"createdBy"}); // createdById
vehiclemake.belongsTo(User, { as:"updatedBy"});
// vehiclemake.hasMany(VehicleModel);

module.exports = vehiclemake;
