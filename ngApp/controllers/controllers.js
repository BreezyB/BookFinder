var myapp;
(function (myapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(siteService, bookService) {
                this.siteService = siteService;
                this.bookService = bookService;
                this.sites = this.siteService.list();
                this.books = this.bookService.list();
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var LoginController = (function () {
            function LoginController(userService, $window, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$state = $state;
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.userService.loginUser(this.userInfo).then(function (data) {
                    _this.$window.localStorage.setItem("token", JSON.stringify(data.token));
                    _this.$state.go('home');
                    alert('login successful');
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var RegisterController = (function () {
            function RegisterController(userService) {
                this.userService = userService;
            }
            RegisterController.prototype.signup = function () {
                this.userService.registerUser(this.user).then(function () {
                    alert('signup successful, please login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var AddSiteController = (function () {
            function AddSiteController(siteService, $state, $stateParams) {
                this.siteService = siteService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.sites = this.siteService.list();
            }
            AddSiteController.prototype.save = function () {
                var _this = this;
                this.siteService.save(this.site).then(function () {
                    _this.$state.go('home');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return AddSiteController;
        }());
        Controllers.AddSiteController = AddSiteController;
        var SiteDetailsController = (function () {
            function SiteDetailsController(siteService, $stateParams, $state) {
                this.siteService = siteService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.site = this.sites.filter(function (p) { return p.id == $stateParams['id']; })[0];
            }
            SiteDetailsController.prototype.remove = function (siteId) {
                var _this = this;
                this.siteService.remove(siteId).then(function () {
                    _this.sites = _this.siteService.list();
                }).catch(function (err) {
                    console.error(err);
                });
            };
            SiteDetailsController.prototype.save = function () {
                var _this = this;
                this.siteService.save(this.site).then(function () {
                    _this.$state.go('Details');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return SiteDetailsController;
        }());
        Controllers.SiteDetailsController = SiteDetailsController;
        var AddBookController = (function () {
            function AddBookController(bookService, siteService, $state, $stateParams) {
                this.bookService = bookService;
                this.siteService = siteService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.books = this.bookService.list();
                this.sites = this.siteService.list();
            }
            AddBookController.prototype.save = function () {
                var _this = this;
                this.bookService.save(this.book).then(function () {
                    _this.$state.go('home');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return AddBookController;
        }());
        Controllers.AddBookController = AddBookController;
    })(Controllers = myapp.Controllers || (myapp.Controllers = {}));
})(myapp || (myapp = {}));
