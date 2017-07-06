(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addProjectController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService","projectService",
                addProjectController
            ]);
    function
        addProjectController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService,
            projectService) {

            $scope.tinymceModel = 'Initial content';

            $scope.getContent = function () {
                console.log('Editor content', $scope.tinymceModel);
            };

            $scope.setContent = function () {
                $scope.tinymceModel = 'Time ' + (new Date());
            };

            $scope.tinymceOptions = {
                plugins: 'link image code paste',
                toolbar: 'undo redo  bold italic  alignleft aligncenter alignright code image paste',
                paste_data_images: true
            };

        $scope.busyGettingData = true;
        $scope.categories = [];
        $scope.categoryList = [];
            function getAllCategories() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function (results) {
                        $scope.categories = results;
                        for (var i = 0; i < results.length; i++) {
                            $scope.categoryList.push(angular.copy(results[i].CategoryName));
                        }

                        $scope.busyGettingData = false;
                    });
        }
            $rootScope.projectUploaded = function () {
                getAllCategories();
            };
            $scope.uploadPic = function () {

                //console.log($scope.Project);
                $scope.Project.Description = "";

                projectService.save($scope.Project, $scope.DisplayImage, $scope.Pdf);
            };
            $rootScope.validate();
            getAllCategories();

        }
}());