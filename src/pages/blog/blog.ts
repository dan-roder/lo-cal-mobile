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

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private wordpressService: WordPressProvider

  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');
    this.wordpressService.getCustomPostType('blog_post').subscribe(posts => {
        this.allBlogPosts = JSON.parse(posts._body);
        console.log(this.allBlogPosts);

      })
  }
  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

}
