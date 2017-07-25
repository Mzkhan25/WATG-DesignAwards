(function () {
    "use strict";
    var modules = [
        "ngRoute",
        "ngFileUpload",
        //"angular.filter",
        "ui.tinymce"
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

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });

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
                $scope.busyGettingData = true;
                if ($scope.categoryImage && $scope.categoryName)
                    categoryService.save(file, $scope.categoryName)
                        .then(function (results) {
                            $scope.categoryName = "";
                            $scope.categoryImage = "";

                            if (results){
                                Materialize.toast('Category added successfully', 4000);
                            }
                            else {
                                Materialize.toast('Category not added', 4000);
                            }
                            $scope.busyGettingData = false;
                        });
            };
            $rootScope.categoryUploaded = function () {
                getAll();
            };
            $scope.modalClicked = function (shortCurrencyName, imageBlob) {
                $scope.shortCurrencyName = shortCurrencyName;
                $scope.imageBlob = imageBlob;
            };
            $scope.delete = function (id) {
                $scope.busyGettingData = true;
                categoryService.delete(id)
                    .then(function (result) {
                        if (results) {
                            Materialize.toast('Category removed successfully', 4000);
                        }
                        else {
                            Materialize.toast('Error occured', 4000);
                        }
                        getAll();
                    });
            };
            $rootScope.validateAdmin();
            getAll();

        }
}());
(function () {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("addProjectController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "$sce",
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
            $sce,
            categoryService,
            projectService) {

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });

            $scope.tinymceModel = 'Initial content';

            $scope.getContent = function () {
                console.log('Editor content', $scope.tinymceModel);
            };

            $scope.setContent = function () {
                $scope.tinymceModel = 'Time ' + (new Date());
            };

            $scope.tinymceOptions = {
                    plugins: 'link image code paste media',
                toolbar: 'undo redo  bold italic  alignleft aligncenter alignright code image paste',
                paste_data_images: true
            };

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

                console.log($scope.Project);
                $scope.busyGettingData = true;
                //$scope.Project.Description = String($scope.Project.Description).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

                var results = projectService.save($scope.Project, $scope.DisplayImage, $scope.Pdf)
                    .then(function (results) {
                        $scope.Project.Title = "";
                        $scope.Project.Office = "";
                        $scope.Project.CategoryId = "";
                        $scope.Project.Description = "";
                        $scope.DisplayImage = "";
                        $scope.Pdf = "";
                        
                    if(results)
                        {
                            Materialize.toast('Project added successfully', 4000);
                            $scope.busyGettingData = false;
                        }
                    else {
                        Materialize.toast('Project not added', 4000);
                        $scope.busyGettingData = false;
                    }
            });
            };
            $rootScope.validateAdmin();
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
        $scope.busyGettingData = false;
            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });


        $scope.roles = [{ Id: 0, Name: "Admin" }, { Id: 1, Name: "User" }];
        $scope.saveUser = function () {
            $scope.busyGettingData = true;
            userService.save($scope.User)
                .then(function (result) {

                    $scope.User.FirstName = "";
                    $scope.User.LastName = "";
                    $scope.User.Email = "";
                    $scope.User.Password = "";
                    $scope.User.Role = "";

                    if (result){
                        Materialize.toast('User added successfully', 4000);
                    }
                    else{
                        Materialize.toast('User not added', 4000);
                    }
                    $scope.busyGettingData = false;
                });
        };
            $rootScope.validateAdmin();
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
            $rootScope.validateUser();
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

            $scope.loginEnterKey = function (keyEvent) {
                if (keyEvent.which === 13)
                    $scope.login();
            };

            $scope.login = function() {
                $scope.busyGettingData = true;
                userService.login($scope.userPin)
                    .then(function (result) {

                        localStorage.setItem("userObj",  JSON.stringify(result));

                        if (result.Role === 1) {
                            $scope.busyGettingData = false;
                            
                            localStorage.setItem("loginTimeStamp", new Date());
                            $location.path("/category");
                        }
                        else if (result.Role === 0) {
                            $scope.busyGettingData = false;
                            localStorage.setItem("loginTimeStamp", new Date());
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
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window","$sce", "projectService","categoryService",
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
            $sce,
            projectService,
            categoryService) {
            $scope.busyGettingData = true;
            $scope.projectId = $routeParams.projectId;
            $scope.categoryName = "";

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });

            var getProjectById = function () {
                
                projectService.getById($scope.projectId)
                    .then(function (result) {

                        categoryService.getOne(result[0].CategoryId).
                            then(function (category) {
                                $scope.categoryName = category[0].CategoryName;
                            });
                        
                        result[0].DisplayImage = $rootScope.arrayBufferToBase64(result[0].DisplayImage);
                        result[0].Description = $sce.trustAsHtml(result[0].Description);
                        $scope.project = result[0];
                        $scope.busyGettingData = false;
                    });
            };
            $scope.getProject = function() {
                $window.open($scope.project.PdfPath);
            };
            $rootScope.validateUser();
            getProjectById();
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignAwards")
        .controller("projectsController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "$sce", "projectService", "resultService","categoryService",
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
            $sce,
            projectService,
            resultService,
            categoryService) {
            $scope.categoryId = $routeParams.categoryId;
            $scope.projectList = [];
            $scope.voted = "";
            $scope.voteStatus = "";
            $scope.voteResponse = false;
            $scope.disbleVotBtn = false;
            $scope.busyGettingData = true;
            $scope.categoryName = "";

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
                $('.parallax').parallax();
            });

            var getProjectByCategory = function () {
                projectService.getByCategory($scope.categoryId)
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].DisplayImage = $rootScope.arrayBufferToBase64(results[i].DisplayImage);
                            results[i].Description = $sce.trustAsHtml(results[i].Description);
                        }
                        $scope.projectList = results;

                        categoryService.getOne($scope.categoryId).
                            then(function (category) {
                                $scope.categoryName = category[0].CategoryName;
                            });

                        $scope.busyGettingData = false;
                    });
            };
            var voteAlreadyCasted = function () {
                resultService.checkUserVote($scope.categoryId, JSON.parse(localStorage.getItem("userObj")).Id)
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
                    "UserId": JSON.parse(localStorage.getItem("userObj")).Id,
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
            $rootScope.validateUser();
            
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

            $scope.$on("$viewContentLoaded", function () {
                $(".dropdown-button").dropdown();
                $(".button-collapse").sideNav();
            });


            var getResults = function() {
                resultService.getAll()
                    .then(function (result) {
                        $scope.resultList = result;
                        $scope.busyGettingData = false;
                    });
            };
            $scope.busyGettingData = true;
            $rootScope.validateAdmin();
            getResults();
        }
}());
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
angular.module('watgDesignAwardsConst', [])

.constant('CONST_WATGXRESTAPIURL', 'http://localhost:8080/api')

.constant('CONST_RESOURCEURL', 'http://localhost:8081')

.constant('CONST_LOGSENABLED', true)

.constant('CONST_W1_STAFF_PROFILE_URL', 'http://itstage.watg.com/watg1/#teamMemberDetails/')

;
(function () {
    "use strict";
    var app = angular.module("watgDesignAwards");
    app.filter("cut",
        [
            "$filter", function ($filter) {
                return function (value, wordwise, max, tail) {
                    if (!value) return '';

                    max = parseInt(max, 10);
                    if (!max) return value;
                    if (value.length <= max) return value;

                    value = value.substr(0, max);
                    if (wordwise) {
                        var lastspace = value.lastIndexOf(' ');
                        if (lastspace !== -1) {
                            //Also remove . and , so its gives a cleaner result.
                            if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                                lastspace = lastspace - 1;
                            }
                            value = value.substr(0, lastspace);
                        }
                    }
                    return value + (tail || ' …');
                };
            }
        ]);
})();
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
            },
            getSessionTime: function () {
                return $http({
                    method: "GET",
                    url: "Util/GetUserSessionTime"
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
               return Upload.upload({
                    url: "Category/Save",
                    data: { name: name, file: file }
                }).then(function (resp) {
                    $rootScope.categoryUploaded();
                    return resp.data;
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
               return  Upload.upload({
                    url: "Project/Save",
                    data: { project: project, image: image, document: document}
                }).then(function (resp) {
                    return resp.data;
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