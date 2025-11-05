const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check karo ki request header mein token hai
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Token ko header se nikaalo
      token = req.headers.authorization.split(' ')[1]; // 'Bearer TOKEN' se 'TOKEN'

      // 3. Token ko verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. User ID nikaal kar, user ko database se dhoondho
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Agle step (controller) par jaao
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };