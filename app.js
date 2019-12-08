var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//to use strategy
require('./services/passport');
const keys = require('./config/keys');

//to serialize 
var cookieSession = require('cookie-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var billingRouter = require('./routes/billing');
var umfrageRouter = require('./routes/umfrage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    //in milliseconds
    maxAge: 1 * 24 * 60 * 60 * 1000,
    // random signing string 
    keys: [keys.COOKIE_KEY],
    //
    //sameSite: "None",
    //secure: keys.SECURE_COOKIE
  })
)
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/billing', billingRouter);
app.use('/umfrage', umfrageRouter);

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

//configuration for production static react (build)
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets 
  // like main.js or main.css 
  app.use(express.static('client/build'));

  //Express seres the index.htmal file if the route is not recognized
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// this is in bin/www ..? aparently has to be set this time 
const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app;
