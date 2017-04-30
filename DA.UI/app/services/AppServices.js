
var app = angular.module('DesignAwardApp');

app.factory('LoginService', ['$http', '$rootScope', function ($http, $rootScope) {
    var urlBase = $rootScope.baseUrl.concat('/api/v1/User/Login');
    var LoginService = {};

    LoginService.checkUser = function (LoginRequest) {
        return $http.post(urlBase, LoginRequest);
    };
    return LoginService;
}]);

app.factory('CategoryService', ['$http', '$rootScope', function ($http, $rootScope) {
    var urlBase = $rootScope.baseUrl.concat('/api/v1/operation/GetCategories');
    var CategoryService = {};

    CategoryService.getCategories = function () {
        return $http.get(urlBase);
    };
    return CategoryService;
}]);

app.factory('ProjectService', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
    var ProjectService = {};

    ProjectService.getProjectById = function (categoryId) {
        var urlBase = $rootScope.baseUrl.concat('/api/v1/project/GetProjectByCategory?categoryId='+categoryId);
        return $http.get(urlBase);
    };
    ProjectService.getProject = function (projectId) {
        var urlBase = $rootScope.baseUrl.concat('/api/v1/project/GetProjectById?projectId=' + projectId);
        $window.open(urlBase);
        return;
    };
    ProjectService.casteVote = function (voteRequest) {
        var urlBase = $rootScope.baseUrl.concat('/api/v1/result/VoteProject');
        return $http.post(urlBase, voteRequest);
    };
    return ProjectService;
}]);

//ResultService

app.factory('ResultService', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
    var ResultService = {};

    ResultService.getResults = function () {
        var urlBase = $rootScope.baseUrl.concat('/api/v1/result/GetResults');
        return $http.get(urlBase);
    };
  
    return ResultService;
}]);