(function () {
    var app = angular.module("watgDesignAwards");
    
    app.config(["$httpProvider", "$routeProvider", "$locationProvider", appConfig]);
    app.run([
        "$rootScope", "$location", "$interval", "$filter", "appService", appRun
    ]);

    function appConfig($httpProvider, $routeProvider, $locationProvider) {
        $httpProvider.defaults.useXDomain = true;
        //To resolve 2f issue
        $locationProvider.hashPrefix("");
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $routeProvider.when("/category", {
                templateUrl: "app/views/category.html",
                controller: "categoryController"
            })
            .when("/login", {
                templateUrl: "app/views/login.html",
                controller: "loginController"
            })
            .when("/projects/:categoryId?", {
                templateUrl: "app/views/projects.html",
                controller: "projectsController"
            })
            .when("/addCategory", {
                templateUrl: "app/views/addCategory.html",
                controller: "addCategoryController"
            })
            .when("/addUser", {
                templateUrl: "app/views/addUser.html",
                controller: "addUserController"
            })
            .when("/addProject", {
                templateUrl: "app/views/addProject.html",
                controller: "addProjectController"
            })
            .when("/projectDetail/:projectId?", {
                templateUrl: "app/views/projectDetail.html",
                controller: "projectDetailController"
            })
            .when("/results", {
                templateUrl: "app/Views/results.html",
                controller: "resultController"
            })
            .otherwise({ redirectTo: "/login" });
    }

    function appRun($rootScope,
        $location,
        $interval,
        $filter,
        appService) {
        $rootScope.pageTitle = "WATG| Design Awards";
        $rootScope.form = {};
        $rootScope.userApplicationRoles = [];
        $rootScope.currentRoute = "/Login";
        
        $rootScope.adminRoleList = ["results", "addProject", "addUser", "addCategory"];

        $rootScope.user = localStorage.getItem("userObj");

        $rootScope.arrayBufferToBase64 = function (buffer) {
            var binary = "";
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        };
        $rootScope.validate = function () {

            var absoulteUrl = $location.url();
            console.log(absoulteUrl);

            if (!localStorage.getItem("userObj"))
                $location.path("/login");
        };
        $rootScope.logOut = function () {
            localStorage.clear();
            $location.path("/login");

           
        };
        $rootScope.makeFolders = function () {
            appService.makeNecessarryFolders().then(function (response) {
                console.log(response + "Folder make result");
            });
        };
        $rootScope.makeFolders();
      
    }
})();