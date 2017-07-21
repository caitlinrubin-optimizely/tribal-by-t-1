var express = require('express');
var router = express.Router();
var rp = require('request-promise')
var mongoose = require('mongoose');
var Schema = mongoose.Schema
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
  res.render('index', { title: 'Express' });
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
  Question.find({$text: {$search: req.query.query}}, {score: {$meta: "textScore"}})
          .sort({score:{$meta:"textScore"}})
          .then(function(resp){
            return resp;
          })
          .catch(function(err){
            next(err)
          })
})

router.post('/question', function(req, res, next){
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


module.exports = router;
