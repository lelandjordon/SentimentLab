var mongoose  = require("mongoose");

mongoose.connect("mongodb://localhost/asktheaudience");

var Answer    = mongoose.Schema({
  text:     String
});

var Question  = mongoose.Schema({
  text:     String,
  answers:  [Answer]
});

mongoose.model("Question",  Question);
mongoose.model("Answer",    Answer);

module.exports= mongoose;
