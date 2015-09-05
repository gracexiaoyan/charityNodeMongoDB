var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var mongo = require('mongodb');

var routes = require('./routes/index');
// var users = require('./routes/users');
var member = require('./routes/member');
var events = require('./routes/events');

var app = express();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongoose  --Grace
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodetest1');
var db = mongoose.connection;
// Make our db accessible to our router  --Grace
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/membership', member);
app.use('/events', events);
// app.use('/users', users);
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//     var kittySchema = mongoose.Schema({
//         username: String,
//         email:String
//     });
//     var Kitten = mongoose.model('Kitten', kittySchema);

//     var silence = new Kitten({ username: 'Silence',email: 'aa@gmail.com' });
//     silence.save(function (err, silence) {
//       if (err) return console.error(err);
//     });
//     Kitten.find(function (err, kittens) {
//       if (err) return console.error(err);
//       console.log(kittens);
//       // res.render('userList', {
//       //       "userlist" : kittens
//       //     });
//     });
//   });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
