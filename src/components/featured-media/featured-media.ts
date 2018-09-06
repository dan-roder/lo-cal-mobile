import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { WordPressProvider } from '../../providers/word-press/word-press';

@Component({
    selector: 'featured-media',
    templateUrl: 'featured-media.html',
    providers: [WordPressProvider]
})
export class FeaturedMediaComponent implements OnInit {
    @Input() id: number;

    media: any;

    constructor(
        private wordpressService: WordPressProvider) { }

    ngOnInit() {
        if (this.id > 0) {
            this.getMedia(this.id);
        }
    }

    getMedia(id) {
        this.wordpressService.getMedia(id)
            .subscribe(result => {
                this.media = result;
            });
    }

}
