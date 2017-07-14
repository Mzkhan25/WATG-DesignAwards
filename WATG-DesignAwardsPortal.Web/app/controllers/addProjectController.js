(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addProjectController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "$sce",
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
            $sce,
            categoryService,
            projectService) {

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });

            $scope.tinymceModel = 'Initial content';

            $scope.getContent = function () {
                console.log('Editor content', $scope.tinymceModel);
            };

            $scope.setContent = function () {
                $scope.tinymceModel = 'Time ' + (new Date());
            };

            $scope.tinymceOptions = {
                    plugins: 'link image code paste media',
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

                console.log($scope.Project);
                $scope.busyGettingData = true;
                //$scope.Project.Description = String($scope.Project.Description).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

                var results = projectService.save($scope.Project, $scope.DisplayImage, $scope.Pdf)
                    .then(function (results) {
                        $scope.Project.Title = "";
                        $scope.Project.Office = "";
                        $scope.Project.CategoryId = "";
                        $scope.Project.Description = "";
                        $scope.DisplayImage = "";
                        $scope.Pdf = "";
                        
                    if(results)
                        {
                            Materialize.toast('Project added successfully', 4000);
                            $scope.busyGettingData = false;
                        }
                    else {
                        Materialize.toast('Project not added', 4000);
                        $scope.busyGettingData = false;
                    }
            });
            };
            $rootScope.validateAdmin();
            getAllCategories();

        }
}());