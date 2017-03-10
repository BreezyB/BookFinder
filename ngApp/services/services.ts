namespace myapp.Services {
  export class UserService {
    public LoginResource
    public SignUpResource

    public registerUser(userObj) {
      return this.SignUpResource.save(userObj).$promise;
    }

    public loginUser(userInfo) {
      return this.LoginResource.save(userInfo).$promise;
    }

    constructor(private $resource:ng.resource.IResourceService){
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
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
      private FindBooksResource;

      public listBooks(id) {
        return this.FindBooksResource.query({id:id});
      }

      public list() {
        return this.BookResource.query();
      }

      public save(book) {
        return this.AddBookResource.save({id:book._id}, book).$promise;

      }

      public remove(bookId) {
        return this.BookResource.remove({id:bookId}).$promise;
      }

      constructor($resource) {
        this.BookResource = $resource('/bookRoutes/api/:id');
        this.AddBookResource = $resource('/bookRoutes/api/AddBook');
        this.FindBooksResource = $resource('/bookRoutes/api/:books');
      }
  }

  angular.module('myapp').service('bookService', BookService);
}
