var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sapBaseRouter = require('./routes/sapBaseRouter'); //SAP
var lineasBaseRouter = require('./routes/lineasBaseRouter'); //LineasBase
var lineasNovedadesRouter = require('./routes/lineasNovedadesRouter'); //LineasBase

var app = express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors({ origin: "https://aguspepee.github.io" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sapBase', sapBaseRouter)
app.use('/lineasBase', lineasBaseRouter)
app.use('/lineasNovedades', lineasNovedadesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
