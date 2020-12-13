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

//Re-Route into other resource routers
router.use('/:bootcampId/course', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
