(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addUserController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                addUserController
            ]);
    function
        addUserController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
        $scope.roles = [{ Id: 0, Name: "Admin" }, { Id: 1, Name: "User" }];
        $scope.saveUser = function () {
            userService.save($scope.User)
                .then(function (result) {
                    alert(result);
                });
        };
            $rootScope.validate();
    }

}());