const { User, Role, Membership } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { firstname, lastname, username, email, password, address, phone } = userData;

  // Validate if email or username already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    throw new Error('Username already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Default role = User (role_id = 2), default membership = Bronze (membership_id = 1)
  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    address,
    phone,
    role_id: 2,
    membership_id: 1
  });

  // Create token
  const token = jwt.sign(
    { id: user.id, email: user.email, name: `${user.firstname} ${user.lastname}`, role: "User" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    id: user.id,
    email: user.email,
    name: `${user.firstname} ${user.lastname}`,
    token
  };
};

const loginUser = async (emailOrUsername, password) => {
  // Find user by email or username
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Create token
  const token = jwt.sign(
    { id: user.id, email: user.email, name: `${user.firstname} ${user.lastname}`, role: await user.getRole().then(role => role.name) },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    id: user.id,
    email: user.email,
    name: `${user.firstname} ${user.lastname}`,
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};