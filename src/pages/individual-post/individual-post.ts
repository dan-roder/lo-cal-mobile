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
    // console.log(this.navParams.get('blogSlug'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndividualPostPage');
    console.log(this.navParams)
    this.getTheBlogPost();
  }
  getTheBlogPost() {
    this.wordpressService.getPostBySlug(this.slug, 'blog_post').subscribe(page => {
        this.pageContent = page[0];
        console.log(page[0].featured_media)
        if(page[0].featured_media !== 0){
            this.wordpressService.getMedia(page[0].featured_media).subscribe(media => {
                console.log('hey hey', media)
                this.featuredImage = media.source_url
                console.log('hey media', this.featuredImage)
            });
        }
        console.log(this.pageContent);
      })
  }

}
