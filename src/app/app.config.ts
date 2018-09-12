import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    public wordpressApiUrl = "http://test-lo-cal.pantheonsite.io/wp-json";
    public localApi = process.env.IONIC_ENV === 'dev' ? "http://localhost:3000" : "http://api.lo-calkitchen.com";
    // public localApi = "http://api.lo-calkitchen.com";
}
