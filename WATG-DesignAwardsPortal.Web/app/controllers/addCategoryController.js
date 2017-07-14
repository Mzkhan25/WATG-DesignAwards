(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addCategoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                addCategoryController
            ]);
    function
        addCategoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });

            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $scope.busyGettingData = false;
                    });
            }
            $scope.uploadPic = function (file) {
                $scope.busyGettingData = true;
                if ($scope.categoryImage && $scope.categoryName)
                    categoryService.save(file, $scope.categoryName)
                        .then(function (results) {
                            $scope.categoryName = "";
                            $scope.categoryImage = "";

                            if (results){
                                Materialize.toast('Category added successfully', 4000);
                            }
                            else {
                                Materialize.toast('Category not added', 4000);
                            }
                            $scope.busyGettingData = false;
                        });
            };
            $rootScope.categoryUploaded = function () {
                getAll();
            };
            $scope.modalClicked = function (shortCurrencyName, imageBlob) {
                $scope.shortCurrencyName = shortCurrencyName;
                $scope.imageBlob = imageBlob;
            };
            $scope.delete = function (id) {
                $scope.busyGettingData = true;
                categoryService.delete(id)
                    .then(function (result) {
                        if (results) {
                            Materialize.toast('Category removed successfully', 4000);
                        }
                        else {
                            Materialize.toast('Error occured', 4000);
                        }
                        getAll();
                    });
            };
            $rootScope.validateAdmin();
            getAll();

        }
}());