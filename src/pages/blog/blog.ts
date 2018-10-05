import { IndividualPostPage } from './../individual-post/individual-post';
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
//   public individualPostPage = IndividualPostPage;
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

    let loader = this.loadingController.create({ content: "Loading" });

    loader.present()

    this.wordpressService.getCustomPostType('blog_post').subscribe(posts => {
        console.log('posts', posts)
        this.allBlogPosts = JSON.parse(posts._body);
        // this.myParams.blogSlug = this.allBlogPosts[0].slug;
        console.log(this.allBlogPosts);

        loader.dismiss();
      })

  }
  setParams(post) {
    console.log(post.slug)
    this.myParams.blogSlug = post.slug
    this.navCtrl.push('IndividualPostPage', this.myParams)
  }
//   goToBlogIndividual() {
//     this.navCtrl.push(this.individualPostPage)
// }
  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }


}
