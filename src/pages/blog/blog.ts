import { WordPressProvider } from './../../providers/word-press/word-press';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {

  public featuredImage : any;
  public allBlogPosts : any;
  public myParams = {
    blogSlug : {},
  };

  constructor(

      public navCtrl: NavController,
      public navParams: NavParams,
      private wordpressService: WordPressProvider,
      private loadingController: LoadingController,

  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');

    let loader = this.loadingController.create({
      content: "Loading ...",
      spinner: "circles"
    });
    loader.present()

    this.wordpressService.getCustomPostType('blog_post').subscribe(posts => {

        this.allBlogPosts = JSON.parse(posts._body);
        loader.dismiss();
      })
  }

  setParams(post) {
    this.myParams.blogSlug = post.slug
    this.navCtrl.push('IndividualPostPage', this.myParams)
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }
}
