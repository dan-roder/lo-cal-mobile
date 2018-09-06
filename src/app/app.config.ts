import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    public wordpressApiUrl = "http://test-lo-cal.pantheonsite.io/wp-json";
    public localApi = "http://localhost:3000";
    // public localApi = "http://api.lo-calkitchen.com";
}
