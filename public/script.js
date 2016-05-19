"use strict";

(function(){
  angular
  .module("myApp", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Question", QuestionFactory)
  .controller("Index", IndexCtrl);
  
  Router.$inject = ["$stateProvider"];
  function Router($stateProvider){
    $stateProvider
    .state("index", {
      url:          "/",
      templateUrl:  "/assets/html/questions-index.html",
      controller:   "Index",
      controllerAs: "IndexVM"
    })
    .state("show",  {
      url:          "/:title",
      templateUrl:  "/assets/html/questions-show.html"
    });
  }
  
  QuestionFactory.$inject = ["$resource"];
  function QuestionFactory($resource){
    var Question = $resource("/api/questions/:title");
    return Question;
  }
  
  IndexCtrl.$inject = ["Question"];
  function IndexCtrl(Question){
    var vm        = this;
    vm.questions  = Question.query();
    vm.create     = function(){
      Question.save(vm.newQuestion, function(response){
        console.log(response);
      });
    }
  }
})();