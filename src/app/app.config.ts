import { Injectable } from "@angular/core";

@Injectable()
export class Config {
  public wordpressApiUrl = "http://demo.wp-api.org/wp-json";
  public localApi = "http://localhost:3000";
}
