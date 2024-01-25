require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
const cors = require("cors")
var path = require('path');
// var cookieParser = require('cookie-parser');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const mealRouter = require('./routes/mealrouters');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', mealRouter)

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

// const DB_PORT = process.env.DB_NAME

// app.listen(DB_PORT, ()=>{
//   console.log("app is running on port " + DB_PORT);
// })


module.exports = app;