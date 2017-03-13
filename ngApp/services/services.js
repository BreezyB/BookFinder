var myapp;
(function (myapp) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
                this.SignUpResource = this.$resource('/userRoutes/api/Register');
                this.UserResource = $resource('/userRoutes/api/:id');
            }
            UserService.prototype.registerUser = function (userObj) {
                return this.SignUpResource.save(userObj).$promise;
            };
            UserService.prototype.loginUser = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            UserService.prototype.list = function () {
                return this.UserResource.query();
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('myapp').service('userService', UserService);
        var SiteService = (function () {
            function SiteService($resource) {
                this.SiteResource = $resource('/siteRoutes/api/:id');
                this.AddSiteResource = $resource('/siteRoutes/api/AddSite');
            }
            SiteService.prototype.get = function (id) {
                return this.SiteResource.get({ id: id });
            };
            SiteService.prototype.list = function () {
                return this.SiteResource.query();
            };
            SiteService.prototype.save = function (site) {
                return this.AddSiteResource.save({ id: site._id }, site).$promise;
            };
            SiteService.prototype.remove = function (siteId) {
                return this.SiteResource.remove({ id: siteId }).$promise;
            };
            return SiteService;
        }());
        Services.SiteService = SiteService;
        angular.module('myapp').service('siteService', SiteService);
        var BookService = (function () {
            function BookService($resource) {
                this.BookResource = $resource('/bookRoutes/api/:id');
                this.AddBookResource = $resource('/bookRoutes/api/AddBook');
            }
            BookService.prototype.get = function (id) {
                return this.BookResource.get({ id: id });
            };
            BookService.prototype.listBooks = function (id) {
                return this.BookResource.query({ id: id });
            };
            BookService.prototype.list = function () {
                return this.BookResource.query();
            };
            BookService.prototype.update = function (book, id) {
                return this.AddBookResource.save({ id: book._id }, book).$promise;
            };
            BookService.prototype.remove = function (bookId) {
                return this.BookResource.remove({ id: bookId }).$promise;
            };
            return BookService;
        }());
        Services.BookService = BookService;
        angular.module('myapp').service('bookService', BookService);
    })(Services = myapp.Services || (myapp.Services = {}));
})(myapp || (myapp = {}));
