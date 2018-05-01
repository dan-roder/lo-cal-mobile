import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';

import { WordPressProvider } from '../../providers/word-press/word-press';

@IonicPage()
@Component({
    selector: 'page-ourstory',
    templateUrl: 'ourstory.html',
    providers: [WordPressProvider]
})
export class OurstoryComponent implements OnInit {

    page: any;

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController

    ) { }

    ngOnInit() {
        this.getPage(2);
    }

    getPage(id) {
        let loader = this.loadingController.create({ content: "Loading" });

        loader.present()
        this.wordpressService.getPage(id)
            .subscribe(result => {
                this.page = result;
                loader.dismiss();
            });
    }

}
