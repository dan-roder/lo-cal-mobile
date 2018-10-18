import { FeaturedImagePipe } from './../../pipes/featured-image.pipe';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WordPressProvider } from './../../providers/word-press/word-press';

@AutoUnsubscribe()

@IonicPage()
@Component({
  selector: 'page-individual-post',
  templateUrl: 'individual-post.html',
})
export class IndividualPostPage {

    public slug: string;
    public pageContent : any;
    public featuredImage : any;

  constructor(

    public navCtrl   : NavController,
    public navParams : NavParams,
    private wordpressService : WordPressProvider

  ) {

    this.slug = this.navParams.get('blogSlug');

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad IndividualPostPage');
    this.getTheBlogPost();
  }
  public getTheBlogPost() {

    this.wordpressService.getPostBySlug(this.slug, 'blog_post').subscribe(page => {

        this.pageContent = page[0];

        if(page[0].featured_media !== 0){

            this.wordpressService.getMedia(page[0].featured_media).subscribe(media => {

                this.featuredImage = media.source_url
            });
        }
      })
  }

}
