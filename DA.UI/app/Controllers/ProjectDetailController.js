

app.controller('ProjectDetailController', function ($scope, $location, $state, $http, $window, $rootScope, $stateParams, toastr, ProjectService) {
    var vm = this;
    vm.projectId = $stateParams.projectId;
    var userData = JSON.parse(localStorage.getItem("loggedInUserObj"));
    vm.projectList = JSON.parse(localStorage.getItem("projectList"));
    vm.project = $.map(vm.projectList, function (val) {
        return val.Id == vm.projectId ? val : null;
    });
    vm.project = vm.project[0];
    console.log(vm.project);
    if (!userData) {
        $state.go('login');
    }

    if (userData.RoleId == 1) {
        $state.go('Result');
    }
    
    vm.user = JSON.parse(localStorage.getItem("loggedInUserObj"));

    vm.getProject = function () {
        ProjectService.getProject(vm.project.Id);
        vm.busyGettingData = false;
    }

    vm.logOut = function () {
        localStorage.clear();
        $state.go("login");
    }
});