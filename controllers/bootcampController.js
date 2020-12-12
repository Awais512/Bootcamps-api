const Bootcamp = require('../models/bootcampModel');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Create Bootcamp
//@route    POST /api/v1/bootcamp
//@access   Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

//@desc     Get all Bootcamps
//@route    GET /api/v1/bootcamp
//@access   Private
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find({});
    res.json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    next(err);
  }
};

//@desc     Get single Bootcamp
//@route    GET /api/v1/bootcamp/:id
//@access   Private
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }
    res.json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

//@desc     Update Bootcamp
//@route    PUT /api/v1/bootcamp/:id
//@access   Private
exports.updateBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

//@desc     Delete Bootcamp
//@route    DELETE /api/v1/bootcamp/:id
//@access   Private
exports.deleteBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }
    res.json({ success: true, msg: 'Bootcamp Deleted Successfully' });
  } catch (err) {
    next(err);
  }
};
