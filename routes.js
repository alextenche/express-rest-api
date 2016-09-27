'use strict';

var express = require('express');
var router = express.Router();

// GET /questions
router.get('/', function(req, res){
  res.json({response: "you sent me a get request"});
});

// POST /questions
router.post('/', function(req, res){
  res.json({
    response: "you sent me a post request",
    body: req.body
  });
});

// GET /questions/:id
router.get('/:id', function(req, res){
  res.json({response: "you sent me a get request for id " + req.params.id});
});

// POST /questions/:id/answers
router.post('/', function(req, res){
  res.json({
    response: "you sent me a post request",
    body: req.body
  });
});



module.exports = router;
