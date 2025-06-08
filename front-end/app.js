const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const loginRoutes = require('./routes/loginRoutes');
const adminBrandRoutes = require('./routes/adminBrandRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const adminCategoryRoutes = require('./routes/adminCategoryRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminRoleRoutes = require('./routes/adminRoleRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const adminMembershipRoutes = require('./routes/adminMembershipRoutes');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter); // index.ejs fallback
app.use('/users', usersRouter);
app.use('/login', loginRoutes);
app.use('/admin/brand', adminBrandRoutes);
app.use('/admin/products', adminProductRoutes);
app.use('/admin/roles', adminRoleRoutes);
app.use('/admin/categories', adminCategoryRoutes);
app.use('/admin/orders', adminOrderRoutes);
app.use('/admin/users', adminUserRoutes);
app.use('/admin/memberships', adminMembershipRoutes);

// Redirect root to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
