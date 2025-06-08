var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models');
const cors = require('cors');
const app = express();
const setupSwagger = require('./swagger');
setupSwagger(app);

const initRoutes = require('./routes/initRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const searchRoutes = require('./routes/searchRoutes');
const roleRoutes = require('./routes/roleRoutes');
const membershipRoutes = require('./routes/membershipRoutes');

const indexRouter = require('./routes/index');


// Allow CORS from front-end
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/brands', brandRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/search', searchRoutes);
app.use('/roles', roleRoutes);
app.use('/memberships', membershipRoutes);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/init', initRoutes);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
