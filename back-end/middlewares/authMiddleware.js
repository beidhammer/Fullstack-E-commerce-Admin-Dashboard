const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ status: 'error', statuscode: 401, data: { result: 'Access Denied. No Token.' } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ status: 'error', statuscode: 400, data: { result: 'Invalid Token' } });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ status: 'error', statuscode: 403, data: { result: 'Access Denied. Admins only.' } });
  next();
};