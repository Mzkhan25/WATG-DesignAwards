﻿

app.controller('ProjectController', function ($scope, $location, $state, $http, $window, $rootScope, $stateParams, ProjectService) {
    var vm = this;
    vm.categoryId = $stateParams.categoryId;
    vm.projectList = [];
    vm.projectCategory = localStorage.getItem("currentCategoryName");

    ProjectService.getProjectById(vm.categoryId)
            .success(function (response) {
                vm.projectList = response;
                console.log(response);
            }).
            error(function (error) {
                console.log("Error occured: " + error);
            });
    vm.getProject = function (projectId) {
        ProjectService.getProject(projectId);
    }
});