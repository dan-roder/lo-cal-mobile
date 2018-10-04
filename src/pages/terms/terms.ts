import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { IPost } from '../../models/post';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector: 'page-terms',
    templateUrl: 'terms.html',
    providers: [WordPressProvider]
})
export class TermsPage implements OnInit {

    page: any;
    pageContent : IPost;

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController,

    ) { }

    ngOnInit() {
        console.log('terms')
        this.getTermsAndPolicy();

    }
    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }
    getTermsAndPolicy () {
        let loader = this.loadingController.create({ content: "Loading" });

        loader.present()
        this.wordpressService.getPost(124).subscribe(page => {
            this.pageContent = page;

            console.log(this.pageContent )
            loader.dismiss();
        })
    }


}
