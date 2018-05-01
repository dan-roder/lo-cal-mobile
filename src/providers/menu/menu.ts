import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Config } from '../../app/app.config';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MenuProvider {
    // theMenu : Array<Object> = [
    //     { id: 0, Name: "Bowls", items: ["Rice", "Chicken", "Pork"] },
    //     { id: 1, Name: "Salad", items: ["Ceaser", "House", "Wedge"] },
    //     {
    //         id: 2,
    //         Name: "Burgers",
    //         items: ["RealBurger", "FakeBurger", "FakeCheese RealBurger"]
    //     },
    //     { id: 3, Name: "Sandwiches", items: ["BLT", "Turkey", "Roast Beef"] },
    //     { id: 4, Name: "Breakfast", items: ["eggs", "pancakes", "waffles"] },
    //     { id: 5, Name: "Smoothies", items: ["Blueberry", "Strawberry", "Mango"] },
    //     { id: 6, Name: "Coffe/Tea", items: ["Regular", "Dark", "Light"] },
    //     { id: 7, Name: "Juices", items: ["Orange", "Carrot", "Pineapple"] }
    // ];


    constructor(
        public  http   : Http,
        private config : Config
    ) {}

    // get():Observable<any> {
    //     return Observable.of(this.theMenu);
    // }

    getSubmenus():Observable<any> {
        return this.http.get( `${this.config.localApi}/menus/1/submenus` )
            .map( res => res.json() )
            .catch( error => Observable.throw( error.json().error || "Server Error" ) );
    }

    getSubmenu( subMenuId ):Observable<any> {
        return this.http.get( `${this.config.localApi}/menus/1/submenus/${subMenuId}` )
            .map( res => res.json() )
            .catch( error => Observable.throw( error.json().error || "Server Error" ) );
    }

    getMenuItem( itemId ):Observable<any> {
        return this.http.get( `${this.config.localApi}/menus/1/menu-item/${itemId}` )
            .map( res => res.json() )
            .catch( error => Observable.throw( error.json().error || "Server Error" ) );
    }
}
