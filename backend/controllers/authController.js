const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/userModel');


// User registration
const registerUser = async (req, res) => {
  userData = req.body
  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(401).json({ message:"User with the provided email already exists" });
    }

    // Hash the password before saving the user to the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = new User({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    });

    await newUser.save();
  } catch (error) {
    return res.status(401).json({ message:error.message });
  }
};

// User login
const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    // Generate a JWT token
    const token = jwt.sign({ sub: user._id }, "TMP_SECRET");

    return res.json({ token: token, role: user.role });
  })(req, res, next);
};

// Middleware for verifying JWT token
const authenticateToken = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};

// Middleware for checking permissions
const checkPermission = (requiredRole) => (req, res, next) => {
  const { role } = req.user;

  if (role !== requiredRole && role !== 'admin') {
    return res.status(403).json({ message: 'Insufficient permissions to perform this operation' });
  }

  return next();
};

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
  checkPermission,
};
