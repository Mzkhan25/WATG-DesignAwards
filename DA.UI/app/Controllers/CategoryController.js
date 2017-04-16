

app.controller('CategoryController', function ($scope, $location, $state, $http, $window, $rootScope, CategoryService) {
    var vm = this;
    vm.categoryList = [];

    CategoryService.getCategories()
             .success(function (response) {
                 debugger;
                 vm.categoryList = response;
             }).
             error(function (error) {
                 console.log("Error occured: " + error);
             });
});