(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectDetailController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window","$sce", "projectService","categoryService",
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
            projectService,
            categoryService) {
            $scope.busyGettingData = true;
            $scope.projectId = $routeParams.projectId;
            $scope.categoryName = "";

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });

            var getProjectById = function () {
                
                projectService.getById($scope.projectId)
                    .then(function (result) {

                        categoryService.getOne(result[0].CategoryId).
                            then(function (category) {
                                $scope.categoryName = category[0].CategoryName;
                            });
                        
                        result[0].DisplayImage = $rootScope.arrayBufferToBase64(result[0].DisplayImage);
                        result[0].Description = $sce.trustAsHtml(result[0].Description);
                        $scope.project = result[0];
                        $scope.busyGettingData = false;
                    });
            };
            $scope.getProject = function() {
                $window.open($scope.project.PdfPath);
            };
            $rootScope.validateUser();
            getProjectById();
        }
}());