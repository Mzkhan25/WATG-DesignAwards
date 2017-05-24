(function () {
    "use strict";
    var modules = [
        "ngRoute",
        "ngFileUpload",
        "angular.filter"
    ];
    var app = angular.module("watgDesignAwards", modules);
}());
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addCategoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                addCategoryController
            ]);
    function
        addCategoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {
         
            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $scope.busyGettingData = false;
                    });
            }
            $scope.uploadPic = function (file) {
                if ($scope.categoryImage && $scope.categoryName)
                    categoryService.save(file, $scope.categoryName);
            };
            $rootScope.categoryUploaded = function () {
                getAll();
            };
            $scope.modalClicked = function (shortCurrencyName, imageBlob) {
                $scope.shortCurrencyName = shortCurrencyName;
                $scope.imageBlob = imageBlob;
            };
            $scope.delete = function (id) {
                categoryService.delete(id)
                    .then(function (result) {
                        getAll();
                    });
            };
            $rootScope.validate();
            getAll();

        }
}());
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addProjectController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService","projectService",
                addProjectController
            ]);
    function
        addProjectController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService,
            projectService) {
        $scope.busyGettingData = true;
        $scope.categories = [];
        $scope.categoryList = [];
            function getAllCategories() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function (results) {
                        $scope.categories = results;
                        for (var i = 0; i < results.length; i++) {
                            $scope.categoryList.push(angular.copy(results[i].CategoryName));
                        }

                        $scope.busyGettingData = false;
                    });
        }
            $rootScope.projectUploaded = function () {
                getAllCategories();
            };
            $scope.uploadPic = function () {
                projectService.save($scope.Project, $scope.DisplayImage, $scope.Pdf);
            };
            $rootScope.validate();
            getAllCategories();

        }
}());
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addUserController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                addUserController
            ]);
    function
        addUserController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
        $scope.roles = [{ Id: 0, Name: "Admin" }, { Id: 1, Name: "User" }];
        $scope.saveUser = function () {
            userService.save($scope.User)
                .then(function (result) {
                    alert(result);
                });
        };
            $rootScope.validate();
    }

}());
(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("categoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                categoryController
            ]);
    function
        categoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {
            $scope.categoryList = [];
            $scope.busyGettingData = true;
            $rootScope.arrayBufferToBase64 = function (buffer) {
                var binary = "";
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            };
            $scope.loadProjects = function(id) {
                $location.path("/projects/" + id);
            };
            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $rootScope.categories = results;
                        
                        $scope.busyGettingData = false;
                    });
            }
            $rootScope.validate();
            getAll();
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("loginController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                loginController
            ]);
    function
        loginController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
            $scope.userPin = "";
            $scope.invalidUserMsg =
                "Please email helpdesk@watg.com in case you are unable to login to the design awards";
            $scope.invalidPINFlag = false;
            $scope.busyGettingData = false;
            $scope.login = function() {
                $scope.busyGettingData = true;
                userService.login($scope.userPin)
                    .then(function(result) {
                        $rootScope.user = result;
                        console.log($rootScope.user);
                        if (result.Role === 1) {
                            $scope.busyGettingData = false;
                            $location.path("/category");
                        }
                        else if (result.Role === 0) {
                            $scope.busyGettingData = false;
                            $location.path("/results");
                        }
                        else {
                            $scope.invalidPINFlag = true;
                            $scope.busyGettingData = false;
                        }
                    });
            };
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectDetailController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService",
                projectDetailController
            ]);
    function
        projectDetailController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            projectService) {
            $scope.busyGettingData = true;
            $scope.projectId = $routeParams.projectId;
            var getProjectById = function () {
                
                projectService.getById($scope.projectId)
                    .then(function (result) {
                        result[0].DisplayImage = $rootScope.arrayBufferToBase64(result[0].DisplayImage);
                        $scope.project = result[0];
                        $scope.busyGettingData = false;
                    });
            };
            $scope.getProject = function() {
                $window.open($scope.project.PdfPath);
            };
            $rootScope.validate();
            getProjectById();
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectsController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService","resultService",
                projectsController
            ]);
    function
        projectsController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            projectService,
            resultService) {
            $scope.categoryId = $routeParams.categoryId;
            $scope.projectList = [];
            $scope.voted = "";
            $scope.voteStatus = "";
            $scope.voteResponse = false;
            $scope.disbleVotBtn = false;
            $scope.busyGettingData = true;

            var getProjectByCategory = function () {
                projectService.getByCategory($scope.categoryId)
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].DisplayImage = $rootScope.arrayBufferToBase64(results[i].DisplayImage);
                        }
                        $scope.projectList = results;
                        $scope.busyGettingData = false;
                    });
            };
            var voteAlreadyCasted = function() {
                resultService.checkUserVote($scope.categoryId, $rootScope.user.Id)
                    .then(function (result) {
                        $scope.hasAlreadyVoted = result;
                        getProjectByCategory();
                    });
            };
            $scope.loadProjects = function (categoryId) {
                
                $location.path("/projects/" + categoryId);
            };
            $scope.saveVote = function(projectId, categoryId) {
                var voteRequest = {
                    "UserId": $rootScope.user.Id,
                    "ProjectId": projectId,
                    "CategoryId": categoryId
                };
                $scope.disbleVotBtn = true;
                resultService.save(voteRequest)
                    .then(function(response) {
                        $scope.voteResponse = true;
                    });
            };
            $scope.selectedProject = function(id) {
                $location.path("/projectDetail/" + id);
            };
            $rootScope.validate();
            
            voteAlreadyCasted();
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("resultController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "resultService",
                resultController
            ]);
    function
        resultController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            resultService) {
            var getResults = function() {
                resultService.getAll()
                    .then(function (result) {
                        $scope.resultList = result;
                        $scope.busyGettingData = false;
                    });
            };
            $scope.busyGettingData = true;
            $rootScope.validate();
            getResults();
        }
}());
(function () {
    var app = angular.module("watgDesignAwards");
    
    app.config(["$httpProvider", "$routeProvider", "$locationProvider", appConfig]);
    app.run([
        "$rootScope", "$location", "$interval", "$filter", "appService" , appRun
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
        $rootScope.user = {};
        $rootScope.userApplicationRoles = [];
        $rootScope.currentRoute = "/Login";
        $rootScope.user = "unauthorized";
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
            if ($rootScope.user === "unauthorized")
                $location.path("/login");


        };
        $rootScope.logOut = function () {
            $rootScope.user = "unauthorized";
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
angular.module('watgDesignAwardsConst', [])

.constant('CONST_WATGXRESTAPIURL', 'http://localhost:8080/api')

.constant('CONST_RESOURCEURL', 'http://localhost:8081')

.constant('CONST_LOGSENABLED', true)

.constant('CONST_W1_STAFF_PROFILE_URL', 'http://itstage.watg.com/watg1/#teamMemberDetails/')

;
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("appService", ["$http", "$rootScope", appService]);
    function appService($http, $rootScope) {
        return {
            makeNecessarryFolders: function () {
                return $http({
                        method: "GET",
                        url: "Util/MakeNecessarryFolders"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("categoryService", ["$http", "Upload","$rootScope", categoryService]);
    function categoryService($http, Upload,$rootScope) {
        return {
            getAll: function () {
                return $http({
                    method: "GET",
                    url:"Category/GetAll"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getOne: function (id) {
                return $http({
                        method: "GET",
                        url: "Category/GetOne?id="+id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (file, name) {
                Upload.upload({
                    url: "Category/Save",
                    data: { name: name, file: file }
                }).then(function (resp) {
                        $rootScope.categoryUploaded();
                    });
            },
            delete: function (id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "Category/Delete?id=" + id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("projectService", ["$http", "Upload","$rootScope", projectService]);
    function projectService($http, Upload, $rootScope) {
        return {
            getAll: function () {
                return $http({
                        method: "GET",
                        url: "Project/GetAll"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getByCategory: function (id) {
                return $http({
                        method: "GET",
                        url: "Project/GetByCategory?id=" + id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getById: function (id) {
                return $http({
                        method: "GET",
                        url: "Project/GetById?id=" + id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (project,image,document) {
                Upload.upload({
                    url: "Project/Save",
                    data: { project: project, image: image, document: document}
                }).then(function (resp) {
                    $rootScope.projectUploaded();
                });
                
            }
        };
    }
})();
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("resultService", ["$http", "$rootScope", resultService]);
    function resultService($http,  $rootScope) {
        return {

            getAll: function () {
                return $http({
                        method: "GET",
                        url: "Result/GetAll"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getOne: function (id) {
                return $http({
                        method: "GET",
                        url: "Result/GetOne?id=" + id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            checkUserVote: function (categoryId,userId) {
                return $http({
                        method: "GET",
                        url: "Result/CheckUserVote?categoryId=" + categoryId +"&userId=" + userId
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (result) {
                
                return $http({
                        method: "POST",
                        data: {
                            result: result
                        },
                        url: "Result/Save/"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .factory("userService", ["$http",  "$rootScope", userService]);
    function userService($http, $rootScope) {
        return {
            getAll: function () {
                return $http({
                        method: "GET",
                        url: "User/GetAll"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            login: function (password) {
                return $http({
                        method: "GET",
                        url: "User/Login?password=" + password
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (user) {
                return $http({
                        method: "POST",
                        data: {
                            user: user
                        },
                        url: "User/Save/"
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            delete: function (id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "User/Delete?id=" + id
                    })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();