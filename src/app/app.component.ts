import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { CustomerProvider } from '../providers/customer/customer';
import { LoCalApiProvider } from '../providers/lo-cal-api/lo-cal-api';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject, Subscription  } from 'rxjs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'TabsComponent';
  activePage = new Subject();
  pages: Array<{title: string, component: string, active: boolean}>;
  subPages: Array<{title: string, component: string, active: boolean}>;
  customerObserver: Subscription;
  currentCustomer: String;

  constructor(
    public  platform: Platform,
    public  statusBar: StatusBar,
    public  splashScreen: SplashScreen,
    private customerService: CustomerProvider,
    private localApi: LoCalApiProvider,
    public  loadingController : LoadingController
  ){
    console.log( process.env );
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: 'TabsComponent', active: true },
      { title: 'Our Story', component: 'OurstoryComponent', active: false },
      { title: 'Our Food', component: 'OurfoodComponent', active: false},
      { title: 'Catering', component: 'CateringPage', active: false },
      { title: 'Contact Us', component: 'ContactUsPage', active: false },
      { title: 'My Account', component: 'AccountPage', active: false }
    ];
    this.subPages = [
      { title: 'Blog', component: 'BlogPage', active: false },
      { title: 'Terms', component: 'TermsPage', active: false },
      { title: 'Privacy', component: 'PrivacyPage', active: false }
    ];
    this.activePage.subscribe( ( selectedPage: any ) => {

      this.pages.map( page => {
          page.active = page.title === selectedPage.title;
      });
      this.subPages.map( subPage => {
          subPage.active = subPage.title === selectedPage.title;
      });

    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.customerObserver = this.customerService.customerId.subscribe( ( customer ) => {
        // console.log( 'her her', customer );
        if ( customer ) {
          console.log(customer);
          this.currentCustomer = customer;
        } else {
          console.log( "NO CUSTOMER" );
          this.currentCustomer = null;
        }
      });
    });
  }

    openPage( page ) {
      console.log("THE PAGE: ", page);
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component).then((success) => {
        if(!success){
          this.nav.push('LoginPage');
        }
        else{
          this.activePage.next(page);
        }
      }).catch((error) => {
        console.log('error', error);
      });
    }

    pushPage( page ) {
      this.nav.push( page );
    }

    goToSubPage (page) {
      this.nav.setRoot(page.component);
      this.activePage.next(page);
    }

    logout() {
      this.customerService.logOut()
      this.currentCustomer = null;

      this.nav.setRoot('TabsComponent')
    }
}
