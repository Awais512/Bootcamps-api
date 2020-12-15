const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReviews, getReview } = require('../controllers/reviewsController');
const Review = require('../models/reviewModel');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/authMiddleware');

router
  .route('/')
  .get(
    advancedResults(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  );

router.route('/:id').get(getReview);

module.exports = router;
