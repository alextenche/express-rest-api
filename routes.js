'use strict';

var express = require('express');
var router = express.Router();
var Question = require('./models').Question;

router.param('qId', function(req, res, next, id){
  Question.findById(id, function(err, doc){
    if (err) {
      return next(err);
    } else if (!doc) {
      err = new Error('not found');
      err.status = 404;
      return next(err);
    } else {
      req.question = doc;
      return next();
    }
  });
});

router.param('aId', function(req, res, next, id){
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error('not found');
    err.status = 404;
    return next(err);
  }
  next();
});

// GET /questions
router.get('/', function(req, res, next){
  Question.find({})
    .sort({createdAt: -1})
    .exec(function(err, questions){
      if (err) {
        return next(err);
      } else {
        res.json(questions);
      }
    });
});

// POST /questions
router.post('/', function(req, res, next){
  var question = new Question(req.body);
  question.save(function(err, question){
    if (err) {
      return next(err);
    } else {
      res.status(201);
      res.json(question);
    }
  });
});

// GET /questions/:id
router.get('/:qId', function(req, res, next){
  res.json(req.question);
});

// POST /questions/:id/answers
router.post('/:qId/answers', function(req, res, next){
  req.question.answers.push(req.body);
  req.question.save(function(err, question){
    if (err) {
      return next(err);
    } else {
      res.status(201);
      res.json(question);
    }
  });
});

// PUT /questions/:id/answers
router.put('/:qId/answers/:aId', function(req, res, next){
  req.answer.update(req.body, function(err, result){
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

// DELETE /questions/:id/answers
router.delete('/:qId/answers/:aId', function(req, res){
  req.answer.remove(function(err){
    req.question.save(function(err, question){
      if (err) {
        return next(err);
      }
      res.json(question);
    });
  });
});

// POST /questions/:id/answers/vote-up
// POST /questions/:id/answers/vote-down
router.post('/:qId/answers/:aId/vote-:dir',
  function(req, res, next){
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      var err = new Error('not found');
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  function(req, res, next){
    req.answer.vote(req.vote, function(err, question){
      if (err) {
        return next(err);
      }
      res.json(question);
    });
});



module.exports = router;
