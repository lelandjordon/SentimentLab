"use strict";

(function(){
  angular
  .module("myApp", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Question", QuestionFactory)
  .factory("NYTFactory", NYTFactory)
  .controller("Index", IndexController)
  .controller("Start", StartController);

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
    })
    .state("start",  {
      url:          "",
      templateUrl:  "/assets/html/start.html",
      controller:   "Start",
      controllerAs: "StartVM"
    })
    ;
  }

  QuestionFactory.$inject = ["$resource"];
  function QuestionFactory($resource){
    var Question = $resource("/api/questions/:title");
    return Question;
  }

  NYTFactory.$inject = ["$http", "$q"];
  function NYTFactory($http, $q){
    var url=[];
    return {
      sendData: function(data){
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "4cff979d864d4b4292e372cb9a73caac",
          'q': data,
          'sort': "newest",
          'fl': "headline,web_url"
        });

        return $http.jsonp(url).then(function(res){
          console.log(res);
        });
      }
    }
  }


  IndexController.$inject = ["Question"];
  function IndexController(Question){
    var vm        = this;
    vm.questions  = Question.query();
    vm.create     = function(){
      Question.save(vm.newQuestion, function(response){
        vm.questions.push(response);
      });
    };
  }

  StartController.$inject = ["NYTFactory"];
  function StartController(Question){
    var StartVM        = this;

    this.search = function (){
      NYTFactory.sendData(this.searchTerm)
      .then(function(res){
        console.log(res);
      });
    };
    // vm.questions  = Question.query();
    // vm.create     = function(){
    //   Question.save(vm.newQuestion, function(response){
    //     vm.questions.push(response);
      // });
    // }
  }




})();
