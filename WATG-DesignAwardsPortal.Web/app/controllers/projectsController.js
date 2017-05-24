(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectsController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService","resultService",
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
            resultService) {
            $scope.categoryId = $routeParams.categoryId;
            $scope.projectList = [];
            $scope.voted = "";
            $scope.voteStatus = "";
            $scope.voteResponse = false;
            $scope.disbleVotBtn = false;
            $scope.busyGettingData = true;

            var getProjectByCategory = function () {
                projectService.getByCategory($scope.categoryId)
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].DisplayImage = $rootScope.arrayBufferToBase64(results[i].DisplayImage);
                        }
                        $scope.projectList = results;
                        $scope.busyGettingData = false;
                    });
            };
            var voteAlreadyCasted = function() {
                resultService.checkUserVote($scope.categoryId, $rootScope.user.Id)
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