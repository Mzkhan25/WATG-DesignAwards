
var app = angular.module('DesignAwardApp', ['ui.router', 'toastr','angular.filter']);

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
    app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

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
            url: "/Category/:categoryId",
            templateUrl: "app/Views/Projects.html",
            controller: "ProjectController",
            controllerAs: "project"
        })
        .state('Result', {
            url: "/Results",
            templateUrl: "app/Views/Results.html",
            controller: "ResultController",
            controllerAs: "result"
        })
        .state('ProjectDetail', {
            url: "/ProjectDetail/:projectId",
            templateUrl: "app/Views/ProjectDetail.html",
            controller: "ProjectDetailController",
            controllerAs: "projectDetail"
        })
    });
    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.baseUrl = 'http://localhost:49674';
        //localStorage.clear();
    }])