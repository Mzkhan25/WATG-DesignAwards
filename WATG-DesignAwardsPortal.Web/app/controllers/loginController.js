(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("loginController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                loginController
            ]);
    function
        loginController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
            $scope.userPin = "";
            $scope.invalidUserMsg =
                "Please email helpdesk@watg.com in case you are unable to login to the design awards";
            $scope.invalidPINFlag = false;
            $scope.busyGettingData = false;
            $scope.login = function() {
                $scope.busyGettingData = true;
                userService.login($scope.userPin)
                    .then(function(result) {
                        $rootScope.user = result;
                        console.log($rootScope.user);
                        if (result.Role === 1) {
                            $scope.busyGettingData = false;
                            $location.path("/category");
                        }
                        else if (result.Role === 0) {
                            $scope.busyGettingData = false;
                            $location.path("/results");
                        }
                        else {
                            $scope.invalidPINFlag = true;
                            $scope.busyGettingData = false;
                        }
                    });
            };
        }
}());