var mongoose    = require("./connection");
var seed_data   = require("./question_seeds");

var Question    = mongoose.model("Question");

Question.remove().then(function(){
  Question.collection.insert(seed_data).then(function(){
    process.exit();
  });
});
