var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var serialListener = require('./lib/serialListener');

var routes = require('./routes/index');
var users = require('./routes/users');

var pitchAngle = require('./routes/pitchAngle');
var windSpeed = require('./routes/windSpeed');
var dummyLoad = require('./routes/dummyLoad');
var dataInput = require('./routes/dataInput');
var lineGraph = require('./routes/lineGraph');


var app = express();


// serialListener('COM1');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('serialListener()');

app.use('/', routes);
app.use('/users', users);

app.use('/pitchAngle', pitchAngle);
app.use('/windSpeed', windSpeed);
app.use('/dataInput', dataInput);
app.use('/dummyLoad', dummyLoad);
app.use('/lineGraph', lineGraph);

if (app.get('env') === 'development') {
 console.log('App in Dev mode');
} else {
	console.log('App in Prod mode');
};

/// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

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
	console.log('error bad boy ');
 //   res.render('error', {
  //      message: err.message,
  //      error: {}
  //  });

});


module.exports = app;

