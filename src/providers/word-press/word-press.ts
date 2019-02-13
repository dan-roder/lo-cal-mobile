import {
    Injectable
} from '@angular/core';
import {
    Http
} from '@angular/http';
import {
    Config
} from '../../app/app.config';
import 'rxjs/add/operator/map';
import {
    Observable
} from 'rxjs/Observable';

@Injectable()
export class WordPressProvider {

    private _addressContent : any;

    constructor(
        private http: Http,
        private config: Config
    ) {}

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

    getOurStory() {
        return this.http.get(this.config.localApi + `/marketing/our-story`)
            .map(result => {
                return result.json();
            });
    }

    getOurFood() {
        return this.http.get(this.config.localApi + `/marketing/our-food`)
            .map(result => {
                return result.json();
            });
    }

    getCatering() {
        return this.http.get(this.config.localApi + `/marketing/catering`)
            .map(result => {
                return result.json();
            });
    }

    retrieveMenuImages() {
        return this.http.get(this.config.localApi + `/marketing/menu-images`)
            .map(result => {
                return result;
            });
    }

    getPostBySlug(_slug, _postType) {
        return this.http.get(this.config.wordpressApiUrl + `/wp/v2/${_postType}?slug=${_slug}&_embed`)
            .map(result => {
                return result.json();
            })
    }
    getMenuMapObject() {
        return this.http.get(this.config.wordpressApiUrl + `/local-menu/v1/menu_items`).map(result => {
            return result.json();
        })
    }
    getCustomPostTypeById(base, id) {
        return this.http.get(this.config.wordpressApiUrl + `/wp/v2/${base}/${id}`)
            .map(result => {
                return result.json();
            });
    }

    getMedia(id) {
        return this.http.get(this.config.localApi + `/marketing/media/${id}`)
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

    private transformRequest(obj) {
        let p, str;
        str = [];
        for (p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    }
    public logError(data: any) {
        return this.http.post(this.config.wordpressApiUrl + `/error_message/v2/log`, data).map(result => {
            return result;
        })
    }

    public submitContactForm(data: any) {
        let finalData = JSON.stringify(data);
        return this.http.post(this.config.wordpressApiUrl + `/contact_form/v2/submit`, finalData).map(result => {
            return result;
        })
    }
    public getCustomPostType(postType, _perPage: number = null): Observable < any > {
        let perPage = (_perPage !== null) ? `&per_page=${_perPage}` : '';
        return this.http.get(this.config.wordpressApiUrl + `/wp/v2/${postType}?_embed${perPage}`);
    }

    public getAddressContent(): any {
        return this.getPost(3812).map(postData => {
            return this.addressContent = postData;
        });
    }

    get addressContent(): any {
        return this._addressContent;
    }

    set addressContent(address) {
        this._addressContent = address;
    }


}
