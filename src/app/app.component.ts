import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StoryPage } from '../pages/story/story';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(

    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen

    ){

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: TabsPage },
      { title: 'Our Story', component: StoryPage },
      { title: 'Our Food', component: ListPage },
      { title: 'Catering', component: ListPage },
      { title: 'Contact Us', component: ListPage },
      { title: 'My Account', component: ListPage }
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    console.log("THE PAGE: ", page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  public checkActivePage(page): boolean{
    return page === this.activePage;
  }

}
