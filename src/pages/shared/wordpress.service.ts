import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressService {

  constructor(private http: Http, private config: Config) {}

  login(data) {
    let url = this.config.wordpressApiUrl + '/jwt-auth/v1/token';
    return this.http.post(url, data)
      .map(result => {
      return result.json();
    });
  }

  getPosts(query) {
    query = this.transformRequest(query);
    let url = this.config.wordpressApiUrl + `/wp/v2/posts?${query}&_embed`;
    return this.http.get(url)
      .map(result => {
      return result.json();
    });
  }

  getPost(id) {
    return this.http.get(this.config.wordpressApiUrl + `/wp/v2/posts/${id}?_embed`)
      .map(result => {
      return result.json();
    });
  }

  getMedia(id) {
    return this.http.get(this.config.wordpressApiUrl + `/wp/v2/media/${id}`)
      .map(result => {
      return result.json();
    });
  }

  getCategories() {
    return this.http.get(this.config.wordpressApiUrl + '/wp/v2/categories?per_page=100')
    .map(result => {
      return result.json();
    });
  }

  getTags() {
    return this.http.get(this.config.wordpressApiUrl + '/wp/v2/tags?per_page=100')
    .map(result => {
      return result.json();
    });
  }

  getPages() {
    return this.http.get(this.config.wordpressApiUrl + '/wp/v2/pages?per_page=100')
    .map(result => {
      return result.json();
    });
  }

  getPage(id) {
    return this.http.get(this.config.wordpressApiUrl + `/wp/v2/pages/${id}`)
      .map(result => {
      return result.json();
    });
  }

  getMenus() {
    return this.http.get(this.config.wordpressApiUrl + '/wp-api-menus/v2/menus')
    .map(result => {
      return result.json();
    });
  }

  getMenu(id) {
    return this.http.get(this.config.wordpressApiUrl + `/wp-api-menus/v2/menus/${id}`)
      .map(result => {
      return result.json();
    });
  }

  private transformRequest( obj ) {
    let p, str;
    str = [];
    for (p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }

}
