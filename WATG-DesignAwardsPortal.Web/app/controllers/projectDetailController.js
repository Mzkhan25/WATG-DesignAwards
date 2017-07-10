(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectDetailController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window","$sce", "projectService",
                projectDetailController
            ]);
    function
        projectDetailController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            $sce,
            projectService) {
            $scope.busyGettingData = true;
            $scope.projectId = $routeParams.projectId;
            var getProjectById = function () {
                
                projectService.getById($scope.projectId)
                    .then(function (result) {
                        result[0].DisplayImage = $rootScope.arrayBufferToBase64(result[0].DisplayImage);
                        result[0].Description = $sce.trustAsHtml(result[0].Description);
                        $scope.project = result[0];
                        $scope.busyGettingData = false;
                    });
            };
            $scope.getProject = function() {
                $window.open($scope.project.PdfPath);
            };
            $rootScope.validate();
            getProjectById();
        }
}());