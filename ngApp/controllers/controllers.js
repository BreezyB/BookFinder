var myapp;
(function (myapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(siteService, bookService) {
                this.siteService = siteService;
                this.bookService = bookService;
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                this.sites = this.siteService.list();
                this.books = this.bookService.list();
                console.log(this.books);
                console.log(this.sites);
                console.log(payload);
            }
            HomeController.prototype.logout = function () {
                localStorage.removeItem('token');
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var BackOfficeController = (function () {
            function BackOfficeController(siteService, bookService, $state) {
                this.siteService = siteService;
                this.bookService = bookService;
                this.$state = $state;
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                payload.isAdmin = this.isAdmin;
                this.sites = this.siteService.list();
                this.books = this.bookService.list();
                console.log(this.books);
                console.log(this.sites);
            }
            BackOfficeController.prototype.logout = function () {
                localStorage.removeItem('token');
            };
            BackOfficeController.prototype.removeBook = function (id) {
                var _this = this;
                this.bookService.remove(id).then(function () {
                    _this.$state.go("backoffice");
                });
            };
            return BackOfficeController;
        }());
        Controllers.BackOfficeController = BackOfficeController;
        var LoginController = (function () {
            function LoginController(userService, $window, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$state = $state;
            }
            LoginController.prototype.getToken = function () {
                return this.$window.localStorage['token'];
            };
            LoginController.prototype.login = function () {
                var _this = this;
                this.userService.loginUser(this.userInfo).then(function (data) {
                    _this.$window.localStorage.setItem("token", JSON.stringify(data.token));
                    if (_this.userInfo.isAdmin) {
                        _this.$state.go('backoffice');
                    }
                    else {
                        _this.$state.go('home');
                    }
                    alert('login successful');
                });
            };
            LoginController.prototype.logout = function () {
                this.$window.localStorage.removeItem('token');
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(userService, $state) {
                this.userService = userService;
                this.$state = $state;
            }
            RegisterController.prototype.signup = function () {
                var _this = this;
                this.user.isAdmin = false;
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                    _this.$state.go('login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var RegisterController2 = (function () {
            function RegisterController2(userService, $state) {
                this.userService = userService;
                this.$state = $state;
            }
            RegisterController2.prototype.signup = function () {
                var _this = this;
                this.user.isAdmin = true;
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                    _this.$state.go('login');
                });
            };
            return RegisterController2;
        }());
        Controllers.RegisterController2 = RegisterController2;
        var AddSiteController = (function () {
            function AddSiteController(siteService, $state, $stateParams) {
                this.siteService = siteService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.loggedIn = false;
                this.sites = this.siteService.list();
                var token = window.localStorage['token'];
                var payload = JSON.parse(window.atob(token.split('.')[1]));
                this.userId = payload.id;
                console.log(payload);
                if (token) {
                    this.loggedIn = true;
                }
                console.log(this.loggedIn);
            }
            AddSiteController.prototype.save = function () {
                var _this = this;
                this.site.submitedBy = this.userId;
                this.siteService.save(this.site).then(function () {
                    _this.$state.go('home');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return AddSiteController;
        }());
        Controllers.AddSiteController = AddSiteController;
        var AddBookController = (function () {
            function AddBookController(bookService, siteService, $state, $stateParams) {
                this.bookService = bookService;
                this.siteService = siteService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.sites = this.siteService.list();
            }
            AddBookController.prototype.save = function () {
                var _this = this;
                this.bookService.save(this.book).then(function (bookid) {
                    _this.$state.go('home');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return AddBookController;
        }());
        Controllers.AddBookController = AddBookController;
        var SiteDetailsController = (function () {
            function SiteDetailsController($stateParams, bookService, siteService, $state) {
                this.$stateParams = $stateParams;
                this.bookService = bookService;
                this.siteService = siteService;
                this.$state = $state;
                var siteId = $stateParams['id'];
                this.books = this.bookService.listBooks(siteId);
                this.site = this.siteService.get(siteId);
                console.log(this.books);
            }
            return SiteDetailsController;
        }());
        Controllers.SiteDetailsController = SiteDetailsController;
    })(Controllers = myapp.Controllers || (myapp.Controllers = {}));
})(myapp || (myapp = {}));
