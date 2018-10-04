import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

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
        this.getOurStory();
    }
    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }
    getOurStory() {
        let loader = this.loadingController.create({ content: "Loading" });
        loader.present()
        this.wordpressService.getOurStory()
            .subscribe(result => {
                this.page = result;
                loader.dismiss();
            });
    }

}
