const Sequelize = require('sequelize');

const sequelize = require('../database');

const bodytype = sequelize.define('bodytype', {
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
  timestamps: false,
});
// table migrations
// uli create aje tables zako?
//ulitengeneza aje table zako
//"SELECT `id`, `name`, `createdAt`, `updatedAt` FROM `Bodytypes` AS `Bodytype` WHERE `Bodytype`.`id` = '4';
module.exports = bodytype;
