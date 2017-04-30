

app.controller('LoginController', function ($scope, $location, $state, $http, $window, $rootScope, LoginService) {
    var vm = this;
    vm.userPin = '';
    vm.invalidUserMsg = "Please email helpdesk@watg.com in case you are unable to login to the design awards";
    vm.invalidPINFlag = false;
    vm.busyGettingData = false;
    if (localStorage.getItem('loggedInUserObj'))
    {
        $state.go('Category');
    }
  
    $scope.UserLogin = function () {

        var LoginRequest = {
            "Pin": vm.userPin
        }
        vm.busyGettingData = true;
        LoginService.checkUser(LoginRequest)
              .success(function (response) {
                  if (response.IsAuthenticated == true && response.RoleId == 2) {
                      // go to category page
                      localStorage.setItem('loggedInUserObj', JSON.stringify(response));
                      vm.busyGettingData = false;
                      $state.go('Category');
                  }
                  else if (response.IsAuthenticated == true && response.RoleId == 1) {
                      // go to category page
                      localStorage.setItem('loggedInUserObj', JSON.stringify(response));
                      vm.busyGettingData = false;
                      $state.go('Result');
                  }
                  else {
                      vm.invalidPINFlag = true;
                      vm.busyGettingData = false;
                  }

              }).
              error(function (error) {
                  console.log("Error occured: " + error);
                  vm.invalidPINFlag = true;
              });
    };
});