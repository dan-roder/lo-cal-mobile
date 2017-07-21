import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {SuperTabsController} from "ionic2-super-tabs";

import { IntroPage } from '../intro/intro';
import { StoryPage } from '../story/story';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  activePage: any;
  categories: any;
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private superTabsCtrl: SuperTabsController ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');

    this.categories = [
      { title: 'Bowls' },
      { title: 'Salad' },
      { title: 'Burgers' },
      { title: 'Sandwiches' },
      { title: 'Breakfast' },
      { title: 'Smoothies' },
      { title: 'Coffe/Tea' },
      { title: 'Juices' }
    ];

  }

  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }

  checkActivePage(page): boolean{
    return page === this.activePage;
  }

  pushPage(index) {
    // adjust for menu
    index = index + 1;
    // this.rootNavCtrl.push(StoryPage);
    this.superTabsCtrl.slideTo(index);
  }

}
