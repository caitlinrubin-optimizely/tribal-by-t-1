// #!/usr/bin/env node

//C03DPN3QY -- engineering
var rp = require('request-promise')
var slack_token = process.env.SLACK_TOKEN;
var slack_channel = process.argv[2]
var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect(process.env.MONGO_URI);

var isQuestion = function(text) {
  return text.includes('?');
}

var lastTimeSentSchema = mongoose.Schema({
    value: Number
});

var TimeSent = mongoose.model('TimeSent', lastTimeSentSchema);

var last_time_sent;
//get last time sent
TimeSent.findOne()
				.then(function(timeSent) {
					last_time_sent = timeSent.value
					return TimeSent.findByIdAndUpdate(timeSent._id, { $set: { value: new Date() }})
				})


var options = {
  method: 'POST',
  uri: 'https://slack.com/api/channels.history',
  qs: {
    'token': slack_token,
    'channel': slack_channel,
		'count': 10
  },
  json: true // Automatically stringifies the body to JSON
}

rp(options)
.then(function(resp) {
	console.log(resp.messages)
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

	// console.log(all_questions)
  // for (var i = 0; i < all_questions.length; i++) {
  //   var content = all_questions[i];
  //   var question = content[0];
  //   var answers = content.slice(1);
  //   var answers_objs = []
	//
  //   var q = new Question({
  //     content: question,
  //     answers: [answers]
  //   }).save()
  // }
});
