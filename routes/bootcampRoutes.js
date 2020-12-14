const express = require('express');
const router = express.Router();
const {
  createBootcamp,
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcampController');
const Bootcamp = require('../models/bootcampModel');
const advancedResults = require('../middlewares/advancedResults');

const courseRouter = require('./courseRoutes');
const { protect } = require('../middlewares/authMiddleware');

//Re-Route into other resource routers
router.use('/:bootcampId/course', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, bootcampPhotoUpload);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
