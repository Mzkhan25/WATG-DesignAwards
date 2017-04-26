

app.controller('CategoryController', function ($scope, $location, $state, $http, $window, $rootScope, CategoryService) {
    var vm = this;
    vm.categoryList = [];
    vm.busyGettingData = true;
    CategoryService.getCategories()
             .success(function (response) {
                 vm.categoryList = response;
                 localStorage.setItem('categories', JSON.stringify(vm.categoryList));
                 vm.busyGettingData = false;
                 console.log(response);
             }).
             error(function (error) {
                 console.log("Error occured: " + error);
             });

    vm.loadProjects = function(categoryId,categoryName)
    {
        localStorage.setItem('currentCategoryId', categoryId);
        localStorage.setItem('currentCategoryName', categoryName);

        $state.go('Project', { "categoryId": categoryId });
    }
});