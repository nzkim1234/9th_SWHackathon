const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const openBoxRouter = require('./routes/openBox');
const boxControlRouter = require('./routes/boxControl');
const qrImageControlRouter = require('./routes/showQr');
const app = express();
const db = require('./config/config')
require('dotenv').config();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
// view engine setup
app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'pug')
.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')));

app
.use('/', indexRouter)
.use('/users', usersRouter)
.use('/register', registerRouter)
.use('/login', loginRouter)
.use('/openbox', openBoxRouter)
.use('/boxcontrol', boxControlRouter)
.use('/qrimage', qrImageControlRouter);

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
