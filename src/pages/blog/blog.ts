import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');
  }

}
