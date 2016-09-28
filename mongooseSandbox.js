'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(err){
  console.error('connection error:', err);
});

db.once('open', function(){
  console.log('db connection succesfull');
});
