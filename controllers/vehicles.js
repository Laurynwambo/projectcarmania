const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const Vehicle = require('../models/vehicle');
const { CLIEngine } = require('eslint');

exports.getAllVehicles = async (req, res, next) => {
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
    const data = await Vehicle.findAll({
      where: {
        ...filterValue,
      },
      order: [...sortValue],
      offset,
      limit,
      include: ['vehiclemake', 'vehiclemodel', 'bodytype'],
    });
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

// GetVehicle

exports.getVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Vehicle.findByPk(id, {
      include: ['vehiclemake', 'vehiclemodel', 'bodytype'],
    });

    if (!data) {
      const error = new Error();
      error.statusCode = 404;
      error.message = "Record not found"
      throw error;
    }
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

// Add Vehicle
exports.postVehicle = async (req, res, next) => {
  try {
    const {
      reg_no,
      vehiclemakeId,
      vehiclemodelId,
      bodytypeId,
      status,
      mileage,
      price,
      weight,
      color,
      location,
    } = req.body;
    const model = await Vehicle.create({
      reg_no,
      vehiclemakeId,
      vehiclemodelId,
      bodytypeId,
      status,
      mileage,
      price,
      weight,
      color,
      location,
    });
    res.status(201).json({
      id: model.id,
      message: 'Vehicle added successfully',
    });
  } catch (err) {
    next(err);
  }
};

// UpdateVehicle
exports.putVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Vehicle.findByPk(id);
    if (!model) {
      const error = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    const {
      reg_no,
      vehiclemakeId,
      vehiclemodelId,
      status,
      mileage,
      price,
      weight,
      color,
      location,
      bodytypeId,
    } = req.body;
    await model.update({
      reg_no,
      vehiclemakeId,
      vehiclemodelId,
      status,
      mileage,
      price,
      weight,
      color,
      location,
      bodytypeId,
    });
    res.status(200).json({
      data: model,
    });
  } catch (err) {
    next(err);
  }
};

// DeleteVehilce
exports.deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Vehicle.findByPk(id);
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
