'use strict';

var express = require('express');
var app = express();
var routes = require('./routes');
var jsonParser = require('body-parser').json;
var logger = require('morgan');
var mongoose = require('mongoose');

app.use(logger('dev'));
app.use(jsonParser());

mongoose.connect('mongodb://localhost:27017/qa');

// db mongoose
var db = mongoose.connection;

db.on('error', function(err){
  console.error('connection error:', err);
});

db.once('open', function(){
  console.log('db connection succesfull');
});



app.use("/questions", routes);

// catch 404 and forward to the error handler
app.use(function(req, res, next){
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('express server is listening on port: ' + port);
});
