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
        $scope.busyGettingData = false;
            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });


        $scope.roles = [{ Id: 0, Name: "Admin" }, { Id: 1, Name: "User" }];
        $scope.saveUser = function () {
            $scope.busyGettingData = true;
            userService.save($scope.User)
                .then(function (result) {

                    $scope.User.FirstName = "";
                    $scope.User.LastName = "";
                    $scope.User.Email = "";
                    $scope.User.Password = "";
                    $scope.User.Role = "";

                    if (result){
                        Materialize.toast('User added successfully', 4000);
                    }
                    else{
                        Materialize.toast('User not added', 4000);
                    }
                    $scope.busyGettingData = false;
                });
        };
            $rootScope.validateAdmin();
    }

}());