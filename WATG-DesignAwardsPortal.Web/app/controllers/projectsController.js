(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectsController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "$sce", "projectService", "resultService","categoryService",
                projectsController
            ]);
    function
        projectsController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            $sce,
            projectService,
            resultService,
            categoryService) {
            $scope.categoryId = $routeParams.categoryId;
            $scope.projectList = [];
            $scope.voted = "";
            $scope.voteStatus = "";
            $scope.voteResponse = false;
            $scope.disbleVotBtn = false;
            $scope.busyGettingData = true;
            $scope.categoryName = "";

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
                $('.parallax').parallax();
            });

            var getProjectByCategory = function () {
                projectService.getByCategory($scope.categoryId)
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].DisplayImage = $rootScope.arrayBufferToBase64(results[i].DisplayImage);
                            results[i].Description = $sce.trustAsHtml(results[i].Description);
                        }
                        $scope.projectList = results;

                        categoryService.getOne($scope.categoryId).
                            then(function (category) {
                                $scope.categoryName = category[0].CategoryName;
                            });

                        $scope.busyGettingData = false;
                    });
            };
            var voteAlreadyCasted = function () {
                resultService.checkUserVote($scope.categoryId, JSON.parse(localStorage.getItem("userObj")).Id)
                    .then(function (result) {
                        $scope.hasAlreadyVoted = result;
                        getProjectByCategory();
                    });
            };
            $scope.loadProjects = function (categoryId) {
                
                $location.path("/projects/" + categoryId);
            };
            $scope.saveVote = function(projectId, categoryId) {
                var voteRequest = {
                    "UserId": JSON.parse(localStorage.getItem("userObj")).Id,
                    "ProjectId": projectId,
                    "CategoryId": categoryId
                };
                $scope.disbleVotBtn = true;
                resultService.save(voteRequest)
                    .then(function(response) {
                        $scope.voteResponse = true;
                    });
            };
            $scope.selectedProject = function(id) {
                $location.path("/projectDetail/" + id);
            };
            $rootScope.validateUser();
            
            voteAlreadyCasted();
        }
}());