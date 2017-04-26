

app.controller('ProjectController', function ($scope, $location, $state, $http, $window, $rootScope,$stateParams, ProjectService) {
    var vm = this;
    vm.categoryId = $stateParams.categoryId;
    vm.projectList = [];
    vm.voted = "";
    vm.voteStatus = "";
    vm.projectCategory = localStorage.getItem("currentCategoryName");
    vm.user = JSON.parse(localStorage.getItem("loggedInUserObj"));
    console.log(vm.user);
    vm.categories = JSON.parse(localStorage.getItem("categories"));
    console.log(vm.categories);
    vm.busyGettingData = true;
    ProjectService.getProjectById(vm.categoryId)
            .success(function (response) {
                vm.projectList = response;
                vm.busyGettingData = false;
                console.log(response);
            }).
            error(function (error) {
                console.log("Error occured: " + error);
            });
    vm.getProject = function (projectId) {
        ProjectService.getProject(projectId);
        vm.busyGettingData = false;
    }
    vm.loadProjects = function (categoryId, categoryName) {
        localStorage.setItem('currentCategoryId', categoryId);
        localStorage.setItem('currentCategoryName', categoryName);
        $state.go('Project', { "categoryId": categoryId });
    }
    vm.castedVote = function (projectId, categoryId) {
        var voteRequest = {
            "UserId": vm.user.Id,
            "ProjectId": projectId,
            "CategoryId": categoryId
        }
        ProjectService.casteVote(voteRequest).success(function (response) {
            if(response)
            {
                vm.voteStatus = "Vote casted successfully";
            }
            else
            {
                vm.voteStatus = "You have already voted for this category";
            }
           
        }).error(function (error) {
            console.log("Error occured: " + error);
        });
    }
});