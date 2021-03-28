const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('../models/user');
const { CLIEngine } = require('eslint');


exports.getAllUsers = async (req, res, next) => {
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
      sortValue.push(['id', 'DESC']);
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
    const data = await User.findAll({
      where: {
        ...filterValue
      },
      order: [...sortValue],
      offset,
      limit,
    });
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};


exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findByPk(id);
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

// Add User
exports.postUser = async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      createdBy,
      updatedBy
    } = req.body;
    const model = await User.create({
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      id: model.id,
      message: 'User added successfully',
    });
  } catch (err) {
    next(err);
  }
};

// UpdateUser
exports.putUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await User.findByPk(id);
    if (!model) {
      const error = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    const {
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    } = req.body;
    await model.update({
      username,
      password,
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      data: model,
    });
  } catch (err) {
    next(err);
  }
};

// DeleteUser
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await User.findByPk(id);
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
