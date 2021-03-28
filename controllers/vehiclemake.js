const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const Vehiclemake = require('../models/vehiclemake');
const User = require('../models/user');
const { CLIEngine } = require('eslint');

exports.getAllVehiclemake = async (req, res, next) => {
  try {
    const { page, perPage, sort, filter } = req.query;
    const limit = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;
    const sortValue = [];
    const filterValue = {};
    if (sort) {
      Object.keys(sort).map((key) => {
        sortValue.push([
          `${key}`,
          `${parseInt(sort[key]) === 1 ? 'ASC' : 'DESC'}`,
        ]);
      });
    } else {
      sortValue.push(['createdAt', 'DESC']);
    }

    if (filter) {
      Object.keys(filter).map((key) => {
        if (filter[key].length > 0) {
          filterValue[key] = {
            [Op.like]: `%${filter[key]}%`,
          };
        }
      });
    }
    console.log(filterValue);
    const offset = (currentPage - 1) * limit;
    const data = await Vehiclemake.findAll({
      where: {
        ...filterValue,
      },
      order: [...sortValue],
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email', 'username'],
          },
        },
      ],
    });
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getVehiclemake = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Vehiclemake.findByPk(id, {
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: {
            exclude: ['password', 'email', 'username'],
          },
        },
        {
          model:User,
          as:"updatedBy",
          attributes:{
            exclude:["password","email", "username"]
          }
        }
      ],
    });
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.postVehiclemake = async (req, res, next) => {
  try {
    const { name } = req.body;
    const model = await Vehiclemake.create({
      name,
      createdById: req.userId,
    });
    res.status(201).json({
      id: model.id,
      message: 'VehicleMake added successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.putVehiclemake = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Vehiclemake.findByPk(id);
    if (!model) {
      const error = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    const { name } = req.body;
    await model.update({
      name,
      updatedById: req.userId,
    });
    res.status(200).json({
      data: model,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteVehiclemake = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Vehiclemake.findByPk(id);
    if (!model) {
      const error = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    await model.destroy();
    res.status(200).json({
      id,
    });
  } catch (err) {
    next(err);
  }
};
