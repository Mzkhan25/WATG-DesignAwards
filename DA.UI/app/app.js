
var app = angular.module('DesignAwardApp', ['ui.router','toastr']);

    app.config(['$compileProvider',
      function ($compileProvider) {
          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);
      }
    ]);

    app.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });
    });
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
        .state('Project', {
            url: "/Project/:categoryId",
            templateUrl: "app/Views/Projects.html",
            controller: "ProjectController",
            controllerAs: "project"
        })
    });
    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.baseUrl = 'http://localhost:49674';
    }])