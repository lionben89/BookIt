import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';


@Injectable()
export class IconsService {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon(
      'book-closed-gray',
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/book-closed-gray.svg"));

      iconRegistry.addSvgIcon(
        'book-closed-blue',
        sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/book-closed-blue.svg"));

    iconRegistry.addSvgIcon(
      'book-open-gray',
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/book-open-gray.svg"));

      iconRegistry.addSvgIcon(
        'book-open-blue',
        sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/book-open-blue.svg"));

    iconRegistry.addSvgIcon(
      'person-blue',
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/person-blue.svg"));

      iconRegistry.addSvgIcon(
        'person-gray',
        sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/person-gray.svg"));


  }







}
