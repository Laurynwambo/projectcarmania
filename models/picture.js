const Sequelize = require('sequelize');

const sequelize = require('../database');

const picture = sequelize.define('picture', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  front_picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  back_picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  interior_picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  left_picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  right_picture: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},{
  timestamps: false,
});

module.exports = picture;
