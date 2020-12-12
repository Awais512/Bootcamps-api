const Bootcamp = require('../models/bootcampModel');
const asyncHandler = require('express-async-handler');

//@desc     Create Bootcamp
//@route    POST /api/v1/bootcamp
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res) => {
  res.json({ msg: 'Create Bootcamp' });
});

//@desc     Get all Bootcamps
//@route    GET /api/v1/bootcamp
//@access   Private
exports.getBootcamps = asyncHandler(async (req, res) => {
  res.json({ msg: 'Get all Bootcamps' });
});

//@desc     Get single Bootcamp
//@route    GET /api/v1/bootcamp/:id
//@access   Private
exports.getBootcamp = asyncHandler(async (req, res) => {
  res.json({ msg: 'Get single Bootcamp' });
});

//@desc     Update Bootcamp
//@route    PUT /api/v1/bootcamp/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res) => {
  res.json({ msg: 'Update Bootcamp' });
});

//@desc     Delete Bootcamp
//@route    DELETE /api/v1/bootcamp/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res) => {
  res.json({ msg: 'Delete Bootcamp' });
});
