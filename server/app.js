var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {logError , sendError} = require('./middlewares/error-handler');
require('dotenv').config({ path: path.join(__dirname, `.env.${process.env.NODE_ENV}`) })
require('./config/mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

process.env.TZ = "Europe/Moscow";

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.use(logError);
app.use(sendError);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist/client")));
  
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../dist/client", "index.html"));
  });
}

app.use(function(req, res, next) {
  next(createError(404));
});
// app.use('/users', usersRouter);

// catch 404 and forward to error handler

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
