(function () {
    var app = angular.module("watgDesignAwards");
    
    app.config(["$httpProvider", "$routeProvider", "$locationProvider", "$provide", appConfig]);
    app.run([
        "$rootScope", "$location", "$interval", "$filter", "appService", appRun
    ]);
    
    function appConfig($httpProvider, $routeProvider, $locationProvider, $provide) {
        $provide.decorator('$exceptionHandler', function ($delegate) {

            return function (exception, cause) {
                $delegate(exception, cause);
                alert('Error occurred! Please contact admin.');
            };
        });
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
        
        $rootScope.adminRoleList = ["/results", "/addProject", "/addUser", "/addCategory"];

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

        $rootScope.validateAdmin = function () {
            var stateUrl = $location.url();
            if (!localStorage.getItem("userObj"))
                $location.path("/login");
            else {
                var loggedInTimeStamp = localStorage.getItem("loginTimeStamp");
                var currentTimeStamp = new Date();

                var timeDiff = $rootScope.calculateDiffInMins(loggedInTimeStamp, currentTimeStamp);

                if ((JSON.parse(localStorage.getItem("userObj")).Role === 0) && (timeDiff < parseInt(localStorage.getItem("sessionTime"))))
                {
                    $location.path(stateUrl);
                }
                else {
                    $location.path("/login");
                }
            }
        };

        $rootScope.validateUser = function () {
            var stateUrl = $location.url();

            if (!localStorage.getItem("userObj")) {
                $location.path("/login");
            }
            else {
                var loggedInTimeStamp = localStorage.getItem("loginTimeStamp");
                var currentTimeStamp = new Date();

                var timeDiff = $rootScope.calculateDiffInMins(loggedInTimeStamp,currentTimeStamp);

                if ((JSON.parse(localStorage.getItem("userObj")).Role === 1) && (timeDiff < parseInt(localStorage.getItem("sessionTime")))) {
                    $location.path(stateUrl);
                }
                else {
                    $location.path("/login");
                }
            }
        };

        $rootScope.logOut = function () {
            var previousSessionTime = localStorage.getItem("sessionTime");
            localStorage.clear();
            localStorage.setItem("sessionTime", previousSessionTime);
            $location.path("/login");
        };
        $rootScope.makeFolders = function () {
            appService.makeNecessarryFolders().then(function (response) {
                console.log(response + "Folder make result");
            });
        };
        $rootScope.makeFolders();

        $rootScope.getTime = function () {
            appService.getSessionTime().then(function (response) {
                localStorage.setItem("sessionTime", response);

            });
        };
        $rootScope.getTime();

        $rootScope.calculateDiffInMins = function (loggedInDate,currentDate) {
            var diffMis = new Date(currentDate - (new Date(loggedInDate)));
            
            return diffMis.getMinutes();

        };

        $rootScope.navigateHome = function () {

            if (JSON.parse(localStorage.getItem("userObj")).Role === 0){
                $location.path("/results");
            }
            else if (JSON.parse(localStorage.getItem("userObj")).Role === 1){
                $location.path("/category");
            }
        };
        
    }
})();