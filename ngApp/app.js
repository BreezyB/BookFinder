var myapp;
(function (myapp) {
    angular.module('myapp', ['ui.router', 'ngResource', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('login', {
            url: '/login',
            templateUrl: '/ngApp/views/login.html',
            controller: myapp.Controllers.LoginController,
            controllerAs: 'vm'
        })
            .state('register', {
            url: '/register',
            templateUrl: '/ngApp/views/register.html',
            controller: myapp.Controllers.RegisterController,
            controllerAs: 'vm'
        })
            .state('secret', {
            url: '/secretregister',
            templateUrl: '/ngApp/views/secretregister.html',
            controller: myapp.Controllers.RegisterController,
            controllerAs: 'vm'
        })
            .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: myapp.Controllers.HomeController,
            controllerAs: 'vm'
        })
            .state('backoffice', {
            url: '/backoffice',
            templateUrl: '/ngApp/views/backoffice.html',
            controller: myapp.Controllers.BackOfficeController,
            controllerAs: 'vm'
        })
            .state('addsite', {
            url: '/addsite',
            templateUrl: '/ngApp/views/addsite.html',
            controller: myapp.Controllers.AddSiteController,
            controllerAs: 'vm'
        })
            .state('addbook', {
            url: '/addbook',
            templateUrl: '/ngApp/views/addbook.html',
            controller: myapp.Controllers.AddBookController,
            controllerAs: 'vm'
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        })
            .state('SiteInfo', {
            url: '/sitedetails/:id',
            templateUrl: '/ngApp/views/sitedetails.html',
            controller: myapp.Controllers.SiteDetailsController,
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    });
})(myapp || (myapp = {}));
