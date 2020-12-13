const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

//@desc     Login User and get token
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
