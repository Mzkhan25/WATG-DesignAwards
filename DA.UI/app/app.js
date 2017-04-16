
    var app = angular.module('DesignAwardApp', ["ui.router"]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        debugger;
        $urlRouterProvider
                       .otherwise('login');
        $stateProvider
            .state('login', {
                url: "login",
                templateUrl: "app/Views/Login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
    });
    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
      
    }])


    //app.controller('LoginController', function ($scope, $location, $state, $http, $window, $rootScope) {

    //});