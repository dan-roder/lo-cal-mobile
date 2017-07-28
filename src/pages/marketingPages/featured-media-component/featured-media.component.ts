import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { WordpressService } from '../../shared/wordpress.service';

@Component({
  selector: 'featured-media',
  templateUrl: 'featured-media.html',
  providers: [WordpressService]
})
export class FeaturedMedia implements OnInit {
  @Input() id: number;

  media: any;

  constructor(
    private wordpressService: WordpressService) {}

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
