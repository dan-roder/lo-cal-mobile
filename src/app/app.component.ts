import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsComponent } from '../pages/tabs/tabs-component/tabs.component';
import { OurstoryComponent } from '../pages/appPages/ourstory-component/ourstory.component';
import { OurfoodComponent } from '../pages/appPages/ourfood-component/ourfood.component';

import { ListComponent } from '../pages/list/list-component/list.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsComponent;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(

    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private menuController: MenuController

    ){

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: TabsComponent },
      { title: 'Our Story', component: OurstoryComponent },
      { title: 'Our Food', component: OurfoodComponent },
      { title: 'Catering', component: ListComponent },
      { title: 'Contact Us', component: ListComponent },
      { title: 'My Account', component: ListComponent }
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
