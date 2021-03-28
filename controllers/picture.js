const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const Picture = require('../models/picture');
const { CLIEngine } = require('eslint');

exports.getAllPictures = async (req, res, next) => {
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
    const data = await Picture.findAll({
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
exports.getPicture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Picture.findByPk(id);
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.postPicture = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    const model = await Picture.create({
      imageUrl,
    });
    res.status(201).json({
      id: model.id,
      message: 'Picture added successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.putPicture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Picture.findByPk(id);
    if (!model) {
      const error = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    const { imageUrl } = req.body;
    await model.update({
      imageUrl,
    });
    res.status(200).json({
      data: model,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePicture = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await Picture.findByPk(id);
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
