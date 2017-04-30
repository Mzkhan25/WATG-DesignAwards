

app.controller('ResultController', function ($scope, $location, $state, $http, $window, $rootScope, ResultService) {
    
    var vm = this;
    var userData = JSON.parse(localStorage.getItem("loggedInUserObj"));

    if (!userData) {
        $state.go('login');
    }
    else
    {
        if (userData.RoleId == 2)
        {
            $state.go('Category');
        }
    }
    vm.resultList = [];
    ResultService.getResults()
             .success(function (response) {
                 vm.resultList = response;
             }).
             error(function (error) {
                 console.log("Error occured: " + error);
             });

    
});