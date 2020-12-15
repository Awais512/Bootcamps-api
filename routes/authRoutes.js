const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  me,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/me', protect, me);

module.exports = router;
