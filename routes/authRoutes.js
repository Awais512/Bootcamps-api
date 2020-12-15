const express = require('express');
const {
  register,
  login,
  forgotPassword,
  me,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.get('/me', protect, me);

module.exports = router;
