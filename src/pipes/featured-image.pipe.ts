import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featuredImage'
})
export class FeaturedImagePipe implements PipeTransform {

  constructor(){}

  transform(mediaData: any, args?: any): any {
    if(args == 'alt'){
      return mediaData['wp:featuredmedia'][0].alt_text;
    }

    return mediaData['wp:featuredmedia'][0].media_details.sizes[args].source_url;
  }

}
