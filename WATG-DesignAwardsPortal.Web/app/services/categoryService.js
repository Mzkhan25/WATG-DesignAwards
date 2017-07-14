(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("categoryService", ["$http", "Upload","$rootScope", categoryService]);
    function categoryService($http, Upload,$rootScope) {
        return {
            getAll: function () {
                return $http({
                    method: "GET",
                    url:"Category/GetAll"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getOne: function (id) {
                return $http({
                        method: "GET",
                        url: "Category/GetOne?id="+id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (file, name) {
               return Upload.upload({
                    url: "Category/Save",
                    data: { name: name, file: file }
                }).then(function (resp) {
                    $rootScope.categoryUploaded();
                    return resp.data;
                    });
            },
            delete: function (id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "Category/Delete?id=" + id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();