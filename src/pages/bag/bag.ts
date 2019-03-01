import { Component } from "@angular/core";
import { Platform, AlertController, IonicPage, NavController, NavParams } from "ionic-angular";
import { BagProvider } from "../../providers/bag/bag";
import { LineItem } from "../../models/LineItem";
// import { Storage } from "@ionic/storage";
import { CustomerProvider } from '../../providers/customer/customer';
@IonicPage()
@Component({
  selector: "page-bag",
  templateUrl: "bag.html"
})
export class BagPage {

  public itemsInBag: Array < LineItem > ;
  public subtotal: number;
  public tax: number;
  public total: number;
  public isOpen: number = -1;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private bag: BagProvider,
    // private storage: Storage,
    private customerService: CustomerProvider
  ) {
    this.platform.ready().then(() => {
      this.itemsInBag = this.bag.itemsInBag;
      this.subtotal = this.calculateSubtotal(this.itemsInBag);
      this.tax = 0.0;
      this.total = this.subtotal + this.tax;
    });
  }

  ngOnInit() {

  }

  backToMenu() {
    this.navCtrl.popToRoot();
  }

  calculateSubtotal(bagItems): number {
    let total = 0.0;
    bagItems.forEach(item => {
      total += parseFloat((item.ExtendedPrice * item.Quantity).toString());
    });
    return total;
  }

  removeItem(item, index) {
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Are you sure you want to remove this item from your bag?",
      buttons: [{
          text: "No.",
          role: "cancel",
          cssClass: "button-cancel",
          handler: () => {}
        },
        {
          text: "Yes.",
          cssClass: "button-accept",
          handler: () => {
            // console.log("Removed clicked");
            this.bag.removeFromBagAtIndex(index);
            this.subtotal = this.calculateSubtotal(this.itemsInBag);
            this.tax = 0.0;
            this.total = this.subtotal + this.tax;
          }
        }
      ]
    });
    alert.present();
  }
  editItemAtIndex(newVal: number): boolean {
    if (this.isOpen === newVal) {
      this.isOpen = -1;
    } else {
      this.isOpen = newVal;
    }

    return false;
  }
  // goToItem(item, index) {
  //     console.log("edit item", item);

  //     this.bag.removeFromBagAtIndex(index);
  //     this.navCtrl.push("MenuItemPage", { menuItem: item });
  // }
  customizeReturn(item, i){
    this.bag.editingLineItem = item;
    this.bag.editingIndex = i;
    this.navCtrl.push("MenuItemPage", { menuItem: item });

  }
  incrementQuantity(item){
    item.Quantity++;
    this.bag.updatePrice();
    this.total = this.totalPrice

  }

  decrementQuantity(item){
    if(item.Quantity > 1){
      item.Quantity--;
      this.bag.updatePrice();
      this.total = this.totalPrice
    }
  }

  goToLoginPage() {
    this.navCtrl.push("LoginPage", { fromBagPage: true });
  }
  checkout(isGuest) {

    if (isGuest) {
      this.navCtrl.push("CheckoutReviewPage", { guest: true });
    } else {
      this.navCtrl.push("CheckoutReviewPage");
    }
  }
  get loggedInStatus(): boolean {
    return this.customerService.isLoggedIn;
  }
  get totalPrice() {
    return this.bag.totalPrice
  }

}
