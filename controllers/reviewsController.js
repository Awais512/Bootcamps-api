const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/reviewModel');
const Bootcamp = require('../models/bootcampModel');

//@desc     Get all Reviews
//@route    GET /api/v1/reviews
//@route    GET /api/v1/bootcamp/:bootcampId/reviews
//@access   Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
