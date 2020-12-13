const Course = require('../models/courseModel');
const Bootcamp = require('../models/bootcampModel');

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

//@desc     Get Course
//@route    GET /api/v1/course/:id
//@access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({ success: true, data: course });
});

//@desc     Create Course
//@route    POST /api/v1/bootcamp/:bootcampId/course
//@access   Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }
  const course = await Course.create(req.body);
  res.status(200).json({ success: true, data: course });
});
