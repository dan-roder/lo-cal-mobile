import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Config } from '../../app/app.config';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MenuProvider {

    constructor(
        public  http   : Http,
        private config : Config

    ) { }


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
