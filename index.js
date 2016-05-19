var express = require("express");
var mongoose= require("./db/connection");

var app     = express();
var Question= mongoose.model("Question");

app.get("/", function(req, res){
  res.send("This is working!");
});

app.get("/api/questions", function(req, res){
  Question.find().then(function(questions){
    res.json(questions);
  });
});

app.listen(3001, function(){
  console.log("I'm working!");
});
