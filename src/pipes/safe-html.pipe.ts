import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtml implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    return this.sanitizer.bypassSecurityTrustHtml(html);
    // return this.sanitizer.bypassSecurityTrustScript(value);
    // return this.sanitizer.bypassSecurityTrustUrl(value);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
