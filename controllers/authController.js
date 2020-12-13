const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

//@desc     Login User and get token
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
