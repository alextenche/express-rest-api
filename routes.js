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
router.get('/:qId', function(req, res){
  res.json({response: "you sent me a get request for qId " + req.params.qId});
});

// POST /questions/:id/answers
router.post('/:qId/answers', function(req, res){
  res.json({
    response: "you sent me a post request to /answers",
    questionId: req.params.qId,
    body: req.body,
  });
});

// PUT /questions/:id/answers
router.put('/:qId/answers/:aId', function(req, res){
  res.json({
    response: "you sent me a put request to /answers",
    questionId: req.params.qId,
    answerId: req.params.aId,
    body: req.body,
  });
});

// DELETE /questions/:id/answers
router.delete('/:qId/answers/:aId', function(req, res){
  res.json({
    response: "you sent me a delete request to /answers",
    questionId: req.params.qId,
    answerId: req.params.aId
  });
});

// POST /questions/:id/answers/vote-up
// POST /questions/:id/answers/vote-down
router.post('/:qId/answers/:aId/vote-:dir', function(req, res, next){
    if(req.params.dir.search(/^(up|down)$/) === -1) {
      var err = new Error('not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  }, function(req, res){
  res.json({
    response: "you sent me a post request to /vote-" + req.params.dir,
    questionId: req.params.qId,
    answerId: req.params.aId,
    vote: req.params.dir
  });
});



module.exports = router;
