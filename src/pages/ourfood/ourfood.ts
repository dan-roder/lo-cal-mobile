import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector: 'page-ourfood',
    templateUrl: 'ourfood.html',
    providers: [WordPressProvider]
})
export class OurfoodComponent implements OnInit {

    public page: any;

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController

    ) { }

    ngOnInit() {
        this.getOurFood();
    }

    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public getOurFood() {

        let loader = this.loadingController.create({ content: "Loading" });
        loader.present()

        this.wordpressService.getOurFood()
            .subscribe(result => {
                this.page = result;
                loader.dismiss();
            });
    }
}
