const express = require('express');
const router = express.Router();
const rp = require('request-promise')
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const path = require('path');
mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;

var isQuestion = function(text) {
  return text.includes('?');
}

var questionSchema = mongoose.Schema({
    content: String,
    answers: [String]
});

questionSchema.index({'$**': 'text'});
var Question = mongoose.model('Question', questionSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

router.get('/channel_list', function(req,res,next) {
  var slack_token = process.env.SLACK_TOKEN;
  var options = {
    method: 'POST',
    uri: 'https://slack.com/api/channels.list',
    qs: {
      'token': slack_token
    },
    json: true // Automatically stringifies the body to JSON
  }

  rp(options).then(function(resp){
    console.log(resp);
    return res.render('index', {'title': 'Express'})
  })
})

router.get('/question', function(req, res, next){
  console.log("req.params", req.query);
  Question.find({$text: {$search: req.query.query}}, {score: {$meta: "textScore"}})
          .sort({score:{$meta:"textScore"}})
          .then(function(resp){
            return res.json(resp);
          })
          .catch(function(err){
            next(err)
          })
})

router.post('/question', function(req, res, next){
  console.log(req.params);
  var content = req.body.content;
  var question = content[0];
  var answers = content.slice(1);
  var q = new Question({
    content: content
  }).save()
    .then(function(question){
      for (var i = 0; i < answers.length; i++) {
        new Answer({
          question: question._id,
          content: answers[i]
        }).save()
      }
      return res.render('index', {'title': 'Express'});
    })
})

router.delete('/question', function(req, res, next){
  var questionId = req.query.questionId
  Question.remove({'_id': questionId})
          .then(function(resp) {
            res.status(200).send('Okay');
          })
          .catch(function(err) {
            res.status(400).send('Error: ' + err);
          })
})


module.exports = router;
