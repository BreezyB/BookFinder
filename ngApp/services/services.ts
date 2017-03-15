namespace myapp.Services {
  export class UserService {
    public LoginResource;
    public SignUpResource;
    public UserResource;

    public registerUser(userObj) {
      return this.SignUpResource.save(userObj).$promise;
    }

    public loginUser(userInfo) {
      return this.LoginResource.save(userInfo).$promise;
    }

    public list() {
      return this.UserResource.query();
    }


    constructor(private $resource:ng.resource.IResourceService){
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
      this.UserResource = $resource('/userRoutes/api/:id');

    }

  }

  angular.module('myapp').service('userService', UserService);


  export class SiteService {
      private SiteResource;
      private AddSiteResource;

      public get(id) {
        return this.SiteResource.get({id:id});
      }

      public list() {
        return this.SiteResource.query();
      }

      public save(site) {
        return this.AddSiteResource.save({id:site._id}, site).$promise;
      }

      public remove(siteId) {
        return this.SiteResource.remove({id:siteId}).$promise;
      }

      constructor($resource) {
        this.SiteResource = $resource('/siteRoutes/api/:id');
        this.AddSiteResource = $resource('/siteRoutes/api/AddSite');
      }
  }

  angular.module('myapp').service('siteService', SiteService);

  export class BookService {
      private BookResource;
      private AddBookResource;

      public get(id) {
        return this.BookResource.get({id:id});
      }

      public listBooks(id) {
        return this.BookResource.query({id:id});
      }

      public list() {
        return this.BookResource.query();
      }

      public save(book) {
        return this.AddBookResource.save(book).$promise;
      }

      public update(book){
        return this.BookResource.save(book).$promise;
      }
      public remove(bookId) {
        return this.BookResource.remove({id:bookId}).$promise;
      }

      constructor($resource) {
        this.BookResource = $resource('/bookRoutes/api/:id');
        this.AddBookResource = $resource('/bookRoutes/api/AddBook');
      }
  }

  angular.module('myapp').service('bookService', BookService);
}
