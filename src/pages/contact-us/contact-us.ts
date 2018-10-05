import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordPressProvider } from '../../providers/word-press/word-press';
import { IPost } from '../../models/post';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()

@IonicPage()

@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html',
    providers: [WordPressProvider]
})
export class ContactUsPage {

    pageContent : IPost;
    acf : any;
    featuredImage : any;
    mapImage      : string;
    contactForm : FormGroup;
    submittedOnce : boolean = false;
    processing : boolean = false;
    formSuccess : boolean = false;
    formError : string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private loadingController: LoadingController,
        private wordpressService: WordPressProvider,
        private fb: FormBuilder

    ) {

        this.contactForm = fb.group({
            'contact-reason' : [null, Validators.required],
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
    getContactUsPage () {

            let loader = this.loadingController.create({ content: "Loading" });

            loader.present()
            this.wordpressService.getPage(132).subscribe(page => {
                this.pageContent = page;
                this.acf = page.acf;
                this.mapImage = this.acf.left_image.sizes.large

                if(page.featured_media != 0){
                    this.wordpressService.getMedia(page.featured_media).subscribe(media => {

                        this.featuredImage = media.source_url
                        console.log('hey media', this.pageContent)
                    });
                }
                loader.dismiss();
            })

    }
    submitForm(formData){
        this.submittedOnce = true;

        if(formData.valid){
          this.processing = true;
          let data = {
            'contactReason' : formData.get('contact-reason').value,
            'firstName' : formData.get('first-name').value,
            'lastName' : formData.get('last-name').value,
            'email' : formData.get('email').value,
            'comments' : formData.get('comments').value
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
