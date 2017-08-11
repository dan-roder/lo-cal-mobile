import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {SuperTabsController} from "ionic2-super-tabs";

// import { ListComponent } from '../list/list.component';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  activePage: any;
  categories: any;
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private superTabsCtrl: SuperTabsController ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');

    this.categories = [
      { title: 'Bowls', items: ['Rice', 'Chicken', 'Pork'] },
      { title: 'Salad', items: ['Ceaser', 'House', 'Wedge']},
      { title: 'Burgers', items: ['Real', 'Fake']},
      { title: 'Sandwiches', items: ['BLT', 'Turkey', 'Roast Beef'] },
      { title: 'Breakfast', items: ['eggs', 'bacon'] },
      { title: 'Smoothies', items: ['Blueberry', 'Strawberry', 'Mango'] },
      { title: 'Coffe/Tea', items: ['Regular', 'Dark', 'Light'] },
      { title: 'Juices', items: ['Orange','Carrot', 'Pineapple'] }
    ];

  }

  ionViewDidLoad() {

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
