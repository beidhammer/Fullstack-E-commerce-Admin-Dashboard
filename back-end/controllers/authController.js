const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      Status: 'success',
      statuscode: 201,
      data: {
        result: 'You created an account.',
        ...user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      statuscode: 400,
      data: {
        result: error.message
      }
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await authService.loginUser(emailOrUsername, password);
    res.json({
      Status: 'success',
      statuscode: 200,
      data: {
        result: 'You are logged in.',
        ...user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      statuscode: 400,
      data: {
        result: error.message
      }
    });
  }
};