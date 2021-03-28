const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const Vehiclemodel = require('../models/vehiclemodel');
const { CLIEngine } = require('eslint');

exports.getAllVehiclemodels = async (req, res, next) => {
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
    const data = await Vehiclemodel.findAll({
      where: {
        ...filterValue,
      },
      order: [...sortValue],
      offset,
      limit,
      include:["vehiclemake"]
    });
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};
exports.getVehiclemodel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Vehiclemodel.findByPk(id,{include:["vehiclemake"]});
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.postVehiclemodel = async (req, res, next) => {
  try {
    const { name, vehiclemakeId } = req.body;
    const model = await Vehiclemodel.create({
      name,
      vehiclemakeId,
    });
    res.status(201).json({
      id: model.id,
      message: 'Model added successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.putVehiclemodel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Vehiclemodel.findByPk(id);
    if (!model) {
      const error = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    const { name, vehicleMakeId } = req.body;
    await model.update({
      name,
      vehicleMakeId,
    });
    res.status(200).json({
      data: model,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteVehiclemodel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Vehiclemodel.findByPk(id);
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
