const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { get } = require('mongoose');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // 1. Frontend se data nikaalo
  const { name, email, password } = req.body;

  // 2. Validation: Check karo sab kuch hai ya nahi
  if (!name || !email || !password) {
    res.status(400); // Bad Request
    throw new Error('Please add all fields');
  }

  // 3. Check karo ki user pehle se registered toh nahi hai
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // 4. Password ko Hash (encrypt) karo
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 5. Naya user database mein banao
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 6. Agar user ban gaya, toh usse Token do
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
// @desc    Authenticate a user (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // 1. Frontend se data nikaalo
  const { email, password } = req.body;

  // 2. User ko email se dhoondho
  const user = await User.findOne({ email });

  // 3. Check karo user hai AND password match ho raha hai
  if (user && (await bcrypt.compare(password, user.password))) {
    // 4. Sab theek hai, token bhej do
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // 5. User nahi mila ya password galat hai
    res.status(400);
    throw new Error('Invalid email or password');
  }
});


const getMe = asyncHandler(async (req, res) => {
  // Middleware ne token verify karke user ko 'req.user' mein daal diya hai.
  // Hum bas usko wapas bhej denge.
  res.status(200).json(req.user);
});




// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};



module.exports = {
  registerUser,loginUser,getMe
};