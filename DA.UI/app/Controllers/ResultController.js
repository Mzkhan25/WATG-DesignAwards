

app.controller('ResultController', function ($scope, $location, $state, $http, $window, $rootScope, ResultService) {
    
    var vm = this;
    vm.resultList = [];
    ResultService.getResults()
             .success(function (response) {
                 vm.resultList = response;
             }).
             error(function (error) {
                 console.log("Error occured: " + error);
             });

    
});