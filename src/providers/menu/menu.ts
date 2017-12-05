import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class MenuProvider {
    theMenu = [
        { id: 0, title: "Bowls", items: ["Rice", "Chicken", "Pork"] },
        { id: 1, title: "Salad", items: ["Ceaser", "House", "Wedge"] },
        {
            id: 2,
            title: "Burgers",
            items: ["RealBurger", "FakeBurger", "FakeCheese RealBurger"]
        },
        { id: 3, title: "Sandwiches", items: ["BLT", "Turkey", "Roast Beef"] },
        { id: 4, title: "Breakfast", items: ["eggs", "pancakes", "waffles"] },
        { id: 5, title: "Smoothies", items: ["Blueberry", "Strawberry", "Mango"] },
        { id: 6, title: "Coffe/Tea", items: ["Regular", "Dark", "Light"] },
        { id: 7, title: "Juices", items: ["Orange", "Carrot", "Pineapple"] }
    ];

    constructor(public http: Http) {
        console.log("Hello MenuProvider Provider");
    }

    get() {
        return Observable.of(this.theMenu);
    }
}
