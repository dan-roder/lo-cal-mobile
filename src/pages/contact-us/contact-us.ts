import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { IPost } from '../../models/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html',
    providers: [WordPressProvider]
})
export class ContactUsPage {

    public pageContent : IPost;
    public acf : any;
    public featuredImage : any;
    public mapImage      : string;
    public contactForm : FormGroup;
    public submittedOnce : boolean = false;
    public processing : boolean = false;
    public formSuccess : boolean = false;
    public formError : string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private loadingController: LoadingController,
        private wordpressService: WordPressProvider,
        private fb: FormBuilder

    ) {

        this.contactForm = this.fb.group({
            'first-name' : [null, Validators.required],
            'last-name' : [null, Validators.required],
            'email' : [null, [Validators.required, Validators.email]],
            'comments' : null,
            'recaptchaReactive' : [null, Validators.required]
          })
    }

    ngOnInit() {
        this.getContactUsPage()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactUsPage');
    }

    // must be present with auto-unsubscribe even if empty
    ngOnDestroy() {
        // You can also do whatever you need here
    }

    public getContactUsPage () {

            let loader = this.loadingController.create({ content: "Loading" });
            loader.present()

            this.wordpressService.getPage(132).subscribe(page => {
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
    public submitForm(formData){
        this.submittedOnce = true;
        if(formData.valid){
          this.processing = true;

          let data = {
            'firstName' : formData.controls['first-name'].value,
            'lastName' : formData.controls['last-name'].value,
            'email' : formData.controls['email'].value,
            'comments' : formData.controls['comments'].value
          }
          this.wordpressService.submitContactForm(data).subscribe(() => {
            this.processing = false;
            this.formSuccess = true;
          }, (error) => {
            this.formError = "We're sorry. There was a problem processing your submission. Please try again.";
            this.wordpressService.logError('Contact Form Error: ' + JSON.stringify(error)).subscribe(() => {})
            this.processing = false;
          });
        }
      }
}
