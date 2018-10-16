import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    public wordpressApiUrl = "http://test-lo-cal.pantheonsite.io/wp-json";
    // public localApi = process.env.IONIC_ENV === 'dev' ? "http://localhost:3000" : "http://api.lo-calkitchen.com";
    public localApi = "http://localhost:3000";
    public railsCustomerEndpoint : string = 'http://localhost:3000/customers';
    public railsOrderEndpoint : string = 'https://api.lo-calkitchen.com/orders';
    public railsTimeEndpoint : string = 'https://api.lo-calkitchen.com/times/1';

    public siteId : number = 1;
    public menuId : number = 1001;

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
}
