import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WordpressService } from '../shared/wordpress.service';

@IonicPage()
@Component({
  selector: 'page-ourstory',
  templateUrl: 'ourstory.html',
  providers: [ WordpressService ]
})
export class OurstoryComponent implements OnInit {

  page: any;

  constructor(

    private navParams: NavParams,
    private wordpressService: WordpressService,
    private navController: NavController,
    private loadingController: LoadingController,
    private storage: Storage

   ) {}

  ngOnInit() {
    this.getPage( 2 );
  }

  getPage( id ) {
    let loader = this.loadingController.create({ content: "Loading" });

    loader.present()
    this.wordpressService.getPage( id )
    .subscribe(result => {
      this.page = result;
      loader.dismiss();
    });
  }

}
