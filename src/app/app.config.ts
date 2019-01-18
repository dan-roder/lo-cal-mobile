import { Injectable } from "@angular/core";
//import { WindowRef } from './windowref';

@Injectable()
export class Config {
  public siteId : number = 1;
  public menuId : number = 1001;

  public wordpressApiUrl = "http://test-lo-cal.pantheonsite.io/wp-json";
  // public localApi = process.env.IONIC_ENV === 'dev' ? "http://localhost:3000" : "http://api.lo-calkitchen.com";
  public localApi = "https://api.lo-calkitchen.com";
  public railsCustomerEndpoint : string = 'https://api.lo-calkitchen.com/customers';
  public railsOrderEndpoint : string = 'https://api.lo-calkitchen.com/orders';
  public railsMenuApi : string = `https://api.lo-calkitchen.com/menus/${this.siteId}`;
  public authenticateEndpoint : string = 'https://api.lo-calkitchen.com/authenticate';
  public railsTimeEndpoint : string = `https://api.lo-calkitchen.com/times/${this.siteId}`;
  public allTimesEndpoint : string = `https://api.lo-calkitchen.com/times/${this.siteId}/1/0/1001`;
  public securityQuestionEndpoint : string = 'https://api.lo-calkitchen.com/securityquestions?Email='
  public mailchimpEndpoint : string = 'https://us14.api.mailchimp.com/3.0/lists/1ab7655e84/members';


  public paymentTypeMap = {
    "amex" : 0,
    "Credit" : 1,
    "dinersclub" : 2,
    "discover" : 3,
    "GiftCard" : 4,
    "jcb" : 5,
    "mastercard" : 6,
    "visa" : 7,
    "PrePaid" : 8
  }

  public cardTypeMap = {
    0 : 'Unknown',
    1 : 'Visa',
    2 : 'Mastercard',
    3 : 'American Express',
    4 : 'Discover',
    5 : 'Diners Club',
    6 : 'JCB',
    7 : 'Paypal'
  }

  public cardClassMap = {
    0 : 'unknown',
    1 : 'visa',
    2 : 'mastercard',
    3 : 'american-express',
    4 : 'discover',
    5 : 'diners-club',
    6 : 'jcb',
    7 : 'paypal'
  }

  public allergenMap = {
    'M' : 'This item contains Milk',
    'SF' : 'This item contains Shellfish',
    'W' : 'This item contains Wheat',
    'V' : 'This item is Vegan',
    'VG' : 'This item is Vegetarian',
    'S' : 'This item contains Soy',
    'F' : 'This item contains Fish',
    'E' : 'This item contains Eggs',
    'TN' : 'This item contains Tree Nuts',
    'P' : 'This item contains Peanuts'
  }

  public errorMap = {

  }

  public orderModeMap = {
    '1' : 'Pickup',
    '2' : 'Delivery',
    '4' : 'Curbside'
  }

  /* constructor(private winRef: WindowRef){
    // Setting API URL based on current environment
    switch(winRef.nativeWindow.location.hostname){
      case 'localhost':
        this.wordpressApiUrl = "https://local.lndo.site/wp-json";
      break;
      case 'live-lo-cal.pantheonsite.io':
        this.wordpressApiUrl = "https://www.lo-calkitchen.com/wp-json";
      break;
      default:
        this.wordpressApiUrl = "https://" + winRef.nativeWindow.location.hostname + "/wp-json";
      break;
    }

  } */
}