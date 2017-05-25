(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("userService", ["$http", "$rootScope", userService]);
    function userService($http, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "User/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            login: function(password) {
                return $http({
                        method: "GET",
                        url: "User/Login?password=" + password
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function(user) {
                return $http({
                        method: "POST",
                        data: {
                            user: user
                        },
                        url: "User/Save/"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            delete: function(id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "User/Delete?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();