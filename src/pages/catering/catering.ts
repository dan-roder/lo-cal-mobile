import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { IPost } from '../../models/post';
@IonicPage()
@Component({
    selector: 'page-catering',
    templateUrl: 'catering.html',
    providers: [WordPressProvider]
})
export class CateringPage implements OnInit {

    page: any;
    cateringForm : FormGroup;
    pageContent : IPost;
    acf : any;
    featuredImage : any;
    submittedOnce : boolean = false;
    loadingImage  : string;
    mapImage      : string;

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
                    console.log('hey media', this.acf)
                });
            }
            // console.log(this.acf )
            loader.dismiss();
        })
    }

}
