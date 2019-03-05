import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { DomSanitizer } from '@angular/platform-browser';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector: 'page-ourstory',
    templateUrl: 'ourstory.html',
    providers: [WordPressProvider]
})
export class OurstoryComponent implements OnInit {

    public page: any;
    public acf : any;
    public featuredImage : any;
    public bgImage : string = '';

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController,
        private sanitizer: DomSanitizer

    ) { }

    ngOnInit() {
        this.getOurStory();
    }

    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public getOurStory() {
        let loader = this.loadingController.create({
          content: "Loading ...",
          spinner: "circles"
        });
        loader.present()

        this.wordpressService.getOurStory()
            .subscribe(page => {
                this.page = page;
                this.acf = page.acf;
                this.bgImage = (page.acf.background_image !== undefined) ? page.acf.background_image.url : '';

                if(page.featured_media != 0){
                    this.wordpressService.getMedia(page.featured_media).subscribe(media => this.featuredImage = media);
                }
                loader.dismiss();
            });
    }

    public getBgImage(){
        let style = `background-image: url(${this.bgImage})`;
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }
}
