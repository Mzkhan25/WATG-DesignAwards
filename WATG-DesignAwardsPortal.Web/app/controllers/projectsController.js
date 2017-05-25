(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectsController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService",
                "resultService", "categoryService",
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
            var getProjectByCategory = function() {
                projectService.getByCategory($scope.categoryId)
                    .then(function(results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].DisplayImage = $rootScope.arrayBufferToBase64(results[i].DisplayImage);
                        }
                        $scope.projectList = results;
                        $scope.busyGettingData = false;
                    });
            };
            var getCategoryInformation = function() {
                categoryService.getOne($scope.categoryId)
                    .then(function(results) {
                        results[0].DisplayImage = $rootScope.arrayBufferToBase64(results[0].Image);
                        $scope.projectCategory = results[0].CategoryName;
                        $scope.DisplayImage = results[0].DisplayImage;
                        getProjectByCategory();
                    });
            };
            var voteAlreadyCasted = function() {
                resultService.checkUserVote($scope.categoryId, $rootScope.user.Id)
                    .then(function(result) {
                        $scope.hasAlreadyVoted = result;
                        getCategoryInformation();
                    });
            };
            $scope.loadProjects = function(categoryId) {
                $scope.busyGettingData = true;
                $scope.categoryId = categoryId;
                voteAlreadyCasted();
                $location.path("/projects/" + categoryId);
            };
            $scope.saveVote = function(projectId, categoryId) {
                var voteRequest = {
                    "UserId": $rootScope.user.Id,
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
            $rootScope.validate();
            voteAlreadyCasted();
        }
}());