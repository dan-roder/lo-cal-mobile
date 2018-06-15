import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';

import { WordPressProvider } from '../../providers/word-press/word-press';

@IonicPage()
@Component({
    selector: 'page-ourfood',
    templateUrl: 'ourfood.html',
    providers: [WordPressProvider]
})
export class OurfoodComponent implements OnInit {

    page: any;

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController

    ) { }

    ngOnInit() {
        this.getCustomPostTypeById('landing_page', 98);
    }

    getCustomPostTypeById( base, id ) {
        let loader = this.loadingController.create({ content: "Loading" });

        loader.present()
        this.wordpressService.getCustomPostTypeById( base, id )
            .subscribe(result => {
                this.page = result;
                loader.dismiss();
            });
    }

}
