var express = require("express");
var hbs     = require("express-handlebars");
var parser  = require("body-parser");
var mongoose= require("./db/connection");
var unirest = require('unirest');

var app     = express();
var Question= mongoose.model("Question");

app.use(parser.json({extended: true}));
app.use("/assets", express.static("public"));
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:      ".hbs",
  layoutsDir:   "views",
  partialsDir:  "views",
  defaultLayout:"layout-main"
}));

app.get("/", function(req, res){
  res.render("main", {layout: false});
});

app.get("/api/questions", function(req, res){
  Question.find().then(function(questions){
    res.json(questions);
  });
});

app.post("/api/questions", function(req, res){
  Question.create(req.body).then(function(question){
    res.json(question);
  });
});

app.listen(3001, function(){
  console.log("I'm working!");
});
