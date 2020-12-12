const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get all Courses
//@route    GET /api/v1/bootcamp
//@route    GET /api/v1/bootcamp/:bootcampId/course
//@access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }
  const courses = await query;
  res.status(200).json({ success: true, count: courses.length, data: courses });
});
