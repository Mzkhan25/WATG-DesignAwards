﻿(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("resultController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "resultService",
                resultController
            ]);
    function
        resultController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            resultService) {

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });


            var getResults = function() {
                resultService.getAll()
                    .then(function (result) {
                        $scope.resultList = result;
                        $scope.busyGettingData = false;
                    });
            };
            $scope.busyGettingData = true;
            $rootScope.validateAdmin();
            getResults();
        }
}());