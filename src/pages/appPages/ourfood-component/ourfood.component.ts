import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WordpressService } from '../../shared/wordpress.service';

@Component({
  selector: 'page-ourfood',
  templateUrl: 'ourfood.html',
  providers: [ WordpressService ]
})
export class OurfoodComponent implements OnInit {

  page: any;

  constructor(

    private navParams: NavParams,
    private wordpressService: WordpressService,
    private navController: NavController,
    private loadingController: LoadingController,
    private storage: Storage

   ) {}

  ngOnInit() {
    this.getPage( 17 );
  }

  getPage( id ) {
    let loader = this.loadingController.create({ content: "Loading" });

    loader.present()
    this.wordpressService.getPage( id ).subscribe( ( result ) => {
      console.log( result );
      this.page = result;
      loader.dismiss();
    });
  }

}
