namespace myapp.Controllers {
    export class HomeController {
       public logout() {
         localStorage.removeItem('token');
       }
      public sites;
      public books;

      constructor (private siteService, private bookService) {
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.sites = this.siteService.list();
        this.books = this.bookService.list();
          console.log(this.books);
          console.log(this.sites);
          console.log(payload);
      }
    }

    export class BackOfficeController {
       public logout() {
         localStorage.removeItem('token');
       }
       public removeBook(id){
         this.bookService.remove(id).then(()=> {
           this.$state.go("backoffice");
         })
       }
      public sites;
      public books;
      public isAdmin;

      constructor (private siteService, private bookService, private $state) {
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        payload.isAdmin = this.isAdmin;
        this.sites = this.siteService.list();
        this.books = this.bookService.list();
          console.log(this.books);
          console.log(this.sites);
      }
    }





/////USERS Controllers
    export class LoginController {
      public userInfo


      public getToken() {
        return this.$window.localStorage['token'];
      }

      public login() {

        this.userService.loginUser(this.userInfo).then((data) => {
          this.$window.localStorage.setItem("token", JSON.stringify(data.token));
            if (this.userInfo.isAdmin) {
              this.$state.go('backoffice')
            }
            else {
              this.$state.go('home');
            }

          alert('login successful');
        })
      }

      public logout() {
        this.$window.localStorage.removeItem('token');
      }

      public constructor(
        private userService, public $window, public $state) {
      }
    }


    export class RegisterController {
      public user
      public signup() {
        this.user.isAdmin = false;
        this.userService.registerUser(this.user).then(() => {
          alert('signup successful, please login');
          this.$state.go('login');
        })
      }
      public constructor(private userService, private $state) {
      }
    }

    export class RegisterController2 {
      public user
      public signup() {
        this.user.isAdmin = true;
        
        this.userService.registerUser(this.user).then(() => {
          alert('signup successful, please login');
          this.$state.go('login');
        })
      }
      public constructor(private userService, private $state) {
      }
    }
/////DROP SITE Controllers
    export class AddSiteController {
      public site;
      public sites;
      public loggedIn = false;
      public userId;
      public save() {
          this.site.submitedBy = this.userId;
          this.siteService.save(this.site).then(()=> {
            this.$state.go('home'); // navigate back to home
          }).catch((err) => {
            console.error(err);
          })
        }
      constructor(private siteService, private $state, private $stateParams,){
        this.sites = this.siteService.list();
        let token = window.localStorage['token'];
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.userId = payload.id;
        console.log(payload);
        if (token) {
          this.loggedIn = true;
        }
        console.log(this.loggedIn);
      }
    }


    ///BOOK Controllers
    export class AddBookController {
      public sites;
      public book;
      public save() {
         this.bookService.save(this.book).then((bookid)=> {
           this.$state.go('home');
          }).catch((err) => {
          console.error(err);
         })
       }
      constructor(private bookService, private siteService, private $state, private $stateParams){
        this.sites = this.siteService.list();
      }
    }

    export class SiteDetailsController {
      public books;
      public site;



      constructor( private $stateParams, private bookService, private siteService, private $state ){
        let siteId = $stateParams['id'];
        this.books = this.bookService.listBooks(siteId);
        this.site = this.siteService.get(siteId);
        console.log(this.books);
      }
    }


}
