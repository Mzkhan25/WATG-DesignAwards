

app.controller('CategoryController', function ($scope, $location, $state, $http, $window, $rootScope, CategoryService) {
    var vm = this;
    vm.categoryList = [];
    CategoryService.getCategories()
             .success(function (response) {
                 vm.categoryList = response;
             }).
             error(function (error) {
                 console.log("Error occured: " + error);
             });

    vm.loadProjects = function(categoryId)
    {
        alert(categoryId);
        $state.go('Project', { "categoryId": categoryId });
    }
});