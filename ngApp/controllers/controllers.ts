namespace myapp.Controllers {
    export class HomeController {
      public sites;
      public books;
    


      //public goToSite(site){
      //  this.$state.go('Details', {id: site._id})
    //  }

      //public getToken() {
      //  return this.$window.localStorage['token'];
      //}
      constructor (private siteService, private bookService) {
        this.sites = this.siteService.list();
        this.books = this.bookService.list();
      }
    }


/////USERS Controllers
    export class LoginController {
      public userInfo
      public login() {
        this.userService.loginUser(this.userInfo).then((data) => {
          this.$window.localStorage.setItem("token", JSON.stringify(data.token));
          this.$state.go('home');
          alert('login successful');
        })
      }

      public constructor(
        private userService, public $window, public $state) {

      }

    }

    export class RegisterController {
      public user
      public signup() {
        this.userService.registerUser(this.user).then(() => {
          alert('signup successful, please login');
        })
      }

      public constructor(
        private userService
      ) {

      }
    }
/////DROP SITE Controllers
    export class AddSiteController {
      public site;
      public sites;
      public save() {
          this.siteService.save(this.site).then(()=> {
            this.$state.go('home'); // navigate back to home
          }).catch((err) => {
            console.error(err);
          })
        }
      constructor(private siteService, private $state, private $stateParams){
        this.sites = this.siteService.list();
      }
    }

    export class SiteDetailsController {
      public site;
      public sites;
      //functions that should have claims
      public remove(siteId) {
          this.siteService.remove(siteId).then(() => {
            this.sites = this.siteService.list(); // redisplay list
          }).catch((err) => {
            console.error(err);
          });
        }
        public save() {
           this.siteService.save(this.site).then(()=> {
             this.$state.go('Details'); // navigate back to home
           }).catch((err) => {
             console.error(err);
           })
         }

      constructor(private siteService, private $stateParams, private $state){
        this.site = this.sites.filter((p) => p.id == $stateParams['id'])[0];
      }
    }


    ///BOOK Controllers
    export class AddBookController {
      public sites;
      public book;
      public books;
      public save() {
          this.bookService.save(this.book).then(()=> {
            this.$state.go('home'); // navigate back to home
          }).catch((err) => {
            console.error(err);
          })
        }
      constructor(private bookService, private siteService, private $state, private $stateParams){
        this.books = this.bookService.list();
        this.sites = this.siteService.list();
      }
    }
}
