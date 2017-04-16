
    var app = angular.module('DesignAwardApp', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
                       .otherwise('/login');
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "app/Views/Login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .state('Category', {
                url: "/Categories",
                templateUrl: "app/Views/Category.html",
                controller: "CategoryController",
                controllerAs: "category"
            })
    });
    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.baseUrl = 'http://localhost:49674';
    }])