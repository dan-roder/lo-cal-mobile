import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { IPost } from '../../models/post';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
  providers: [WordPressProvider]
})

export class PrivacyPage {
  public page: any;
  public pageContent : IPost;

  constructor(
    private wordpressService: WordPressProvider,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getPrivacyPolicy();
  }

  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

  public getPrivacyPolicy () {
    let loader = this.loadingController.create({
      content: "Loading ...",
      spinner: "circles"
  });
    loader.present()

    this.wordpressService.getPost(3982).subscribe(page => {
      this.pageContent = page;
      loader.dismiss();
    })
  }

}
