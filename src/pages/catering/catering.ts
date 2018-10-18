import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { IPost } from '../../models/post';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector: 'page-catering',
    templateUrl: 'catering.html',
    providers: [WordPressProvider]
})
export class CateringPage implements OnInit {

    public page: any;
    public cateringForm : FormGroup;
    public pageContent : IPost;
    public acf : any;
    public featuredImage : any;
    public submittedOnce : boolean = false;
    public loadingImage  : string;
    public mapImage      : string;

    constructor(

        private wordpressService: WordPressProvider,
        private loadingController: LoadingController,
        public fb: FormBuilder

    ) {

        this.loadingImage = '../../assets/icon/loading-eclipse.svg'

    }

    ngOnInit() {
        this.getCateringPage();
    }

    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    getCateringPage() {
        let loader = this.loadingController.create({ content: "Loading" });
        loader.present()

        this.wordpressService.getCustomPostTypeById('landing_page', 126).subscribe(page => {

            this.pageContent = page;
            this.acf = page.acf;
            this.mapImage = this.acf.left_image.sizes.large

            if(page.featured_media != 0){
                this.wordpressService.getMedia(page.featured_media).subscribe(media => {

                    this.featuredImage = media.source_url
                });
            }
            loader.dismiss();
        })
    }
}
