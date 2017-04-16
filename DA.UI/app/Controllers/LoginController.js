

app.controller('LoginController', function ($scope, $location, $state, $http, $window, $rootScope, LoginService) {
    var vm = this;
    vm.userPin = '';
    vm.invalidUserMsg = "Please email helpdesk@watg.com in case you are unable to login to the design awards";
    vm.invalidPINFlag = false;

    if (localStorage.getItem('loggedInUserObj'))
    {
        $state.go('Category');
    }
  
    $scope.UserLogin = function () {

        var LoginRequest = {
            "Pin": vm.userPin
        }
        LoginService.checkUser(LoginRequest)
              .success(function (response) {
                  if (response.IsAuthenticated == true) {
                      // go to category page
                      localStorage.setItem('loggedInUserObj', JSON.stringify(response));
                      $state.go('Category');
                  }
                  else {
                      vm.invalidPINFlag = true;
                  }

              }).
              error(function (error) {
                  console.log("Error occured: " + error);
                  vm.invalidPINFlag = true;
              });
    };
});