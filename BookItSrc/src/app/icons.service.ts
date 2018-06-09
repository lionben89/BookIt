import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Injectable()
export class IconsService {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "book-closed-gray",
      sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/book-closed-gray.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "book-closed-blue",
      sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/book-closed-blue.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "book-open-gray",
      sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/book-open-gray.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "book-open-blue",
      sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/book-open-blue.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "person-blue",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/person-blue.svg")
    );

    iconRegistry.addSvgIcon(
      "person-gray",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/person-gray.svg")
    );

    iconRegistry.addSvgIcon(
      "location_off",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/location_off.svg")
    );

    iconRegistry.addSvgIcon(
      "location_off-blue",
      sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/location_off-blue.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "done",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/done.svg")
    );

    iconRegistry.addSvgIcon(
      "done-blue",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/done-blue.svg")
    );

    iconRegistry.addSvgIcon(
      "add",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/add.svg")
    );

    iconRegistry.addSvgIcon(
      "search",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/search.svg")
    );

    iconRegistry.addSvgIcon(
      "left-arrow",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/left_arrow.svg")
    );

    iconRegistry.addSvgIcon(
      "right-arrow",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/right_arrow.svg")
    );

    iconRegistry.addSvgIcon(
      "right-arrow-settings",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/right_arrow_settings.svg")
    );

    iconRegistry.addSvgIcon(
      "down-arrow-white",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/down-arrow-white.svg")
    );

    iconRegistry.addSvgIcon(
      "down-arrow-black",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/down-arrow-black.svg")
    );

    iconRegistry.addSvgIcon(
      "request-pending",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/request-pending.svg")
    );

    iconRegistry.addSvgIcon(
      "new-message",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/new-message.svg")
    );

    iconRegistry.addSvgIcon(
      "accept",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/accept.svg")
    );
    
    iconRegistry.addSvgIcon(
      "decline",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/decline.svg")
    );

    iconRegistry.addSvgIcon(
      "book-request-blue",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/book-request-blue.svg")
    );

    iconRegistry.addSvgIcon(
      "book-request-gray",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/book-request-gray.svg")
    );

    iconRegistry.addSvgIcon(
      "delete-forever",
      sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/delete-forever.svg"
      )
    );
  }
}
