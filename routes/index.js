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

// var answerSchema = mongoose.Schema({
//     question: {type: Schema.Types.ObjectId, ref: 'Question'},
//     content: String
// });
//
// var Answer = mongoose.model('Answer', answerSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/slack', function(req, res, next) {
  var slack_token = process.env.SLACK_TOKEN;
  // var url = 'https://slack.com/api/channels.history?token=' + slack_token + '&channel=C2F8YUGHL'
  var options = {
    method: 'POST',
    uri: 'https://slack.com/api/channels.history',
    qs: {
      'token': slack_token,
      'channel': 'C2F8YUGHL'
    },
    json: true // Automatically stringifies the body to JSON
  }

  rp(options)
  .then(function(resp) {
    var messages = resp.messages;
    var texts = [];
    for (var i = messages.length-1; i >= 0; i--) {
      if (messages[i].text != '') {
        texts.push(messages[i].text);
      }
    }

    var found_question = false;
    var question_answers = [];
    var all_questions = [];
    for (var i = 0; i < texts.length; i++) {
      if (isQuestion(texts[i])) {
        found_question = true;
        if(question_answers.length > 0) {
          all_questions.push(question_answers);
        }
        question_answers = []
      }

      if (found_question) {
        question_answers.push(texts[i])
      }
    }

    if (question_answers.length > 0) {
      all_questions.push(question_answers)
    }

    var promises = [];
    for (var i = 0; i < all_questions.length; i++) {
      var content = all_questions[i];
      var question = content[0];
      var answers = content.slice(1);
      var answers_objs = []

      var q = new Question({
        content: question,
        answers: [answers]
      }).save()
    }
    return res.render('index', {'title': 'Express'})
  });
})

router.get('/channel_list', function(req,res,next) {
  var slack_token = process.env.slack_token;
  var options = {
    method: 'POST',
    uri: 'https://slack.com/api/channels.history',
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

router.post('/question', function(req, res, next){
  Question.find({$text: {$search: req.body.query}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
          .then(function(resp){
            console.log("GOT A RESPONSE ^^^^^^^^^^^^^^^^", resp)
            return res.render('results', {'results': resp})
          })
          .catch(function(err){
            next(err)
          })
})

// router.post('/question', function(req, res, next){
//   var content = req.body.content;
//   var question = content[0];
//   var answers = content.slice(1);
//   var q = new Question({
//     content: content
//   }).save()
//     .then(function(question){
//       for (var i = 0; i < answers.length; i++) {
//         new Answer({
//           question: question._id,
//           content: answers[i]
//         }).save()
//       }
//       return res.render('index', {'title': 'Express'});
//     })
// })

// router.get('/answer', function(req, res, next) {
//   var question_user_id = req.params.user_id;
//   Question.findOne({'question.$id': question_user_id})
//           .then(function(question) {
//             console.log(question)
//             return res.render('index', {'title': 'Express'});
//           })
//           .catch(function(err) {
//             next(err);
//           })
// })

module.exports = router;
