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

    public page: any;
    public pageContent : IPost;

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController,

    ) { }

    ngOnInit() {
        this.getTermsAndPolicy();
    }

    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public getTermsAndPolicy () {
        let loader = this.loadingController.create({
          content: "Loading ...",
          spinner: "circles"
        });
        loader.present()

        this.wordpressService.getPost(124).subscribe(page => {
            this.pageContent = page;
            loader.dismiss();
        })
    }


}
