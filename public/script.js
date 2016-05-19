"use strict";

(function(){
  angular
  .module("myApp", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
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
  
  IndexCtrl.$inject = [];
  function IndexCtrl(){
    var vm        = this;
    vm.questions  = [
      {
        text: "Test123"
      },
      {
        text: "Test456"
      }
    ];
  }
})();