import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html',
})
export class ContactUsPage {

    url: string = "http://dev-lo-cal.pantheonsite.io/contact";
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public inAppBrowser : InAppBrowser
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactUsPage');

        const options: InAppBrowserOptions = {
            zoom: 'no',
            toolbar: 'no',
            fullscreen: 'yes'
        }
        const browser = this.inAppBrowser.create( this.url, '_self', options);
    }

}
