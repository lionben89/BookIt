import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";
import { Observable } from "rxjs/Observable";
import { MatIconRegistry } from "@angular/material/icon";
import { IconsService } from "./../../../../icons.service";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../dialog-one-button/dialog-one-button.component";
import { DialogTwoButtonComponent } from "../dialog-two-button/dialog-two-button.component";
import { Location } from "../../../../data_types/states.model";
//import { Location } from "@angular/common";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
  providers: [IconsService]
})
export class LocationsComponent implements OnInit {
  public which_page = "locations";
  public no_remove = "Current Location";
  public new_location: Location;

  private locations = new Array<Location>();

  goToSettings() {
    for (let loc of this.locations) {
      if (loc.active) {
        this.store.dispatch(new fromStore.ChooseSettings());
        return;
      }
    }

    /* user didnt pick any location */
    this.openDialog_1();
  }

  goToAddLocation() {
    this.store.dispatch(new fromStore.ChooseSettingsAddLocations());
  }

  openDialog_1(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: "250px",
      data:
        "You didnt pick any location! please pick one before you leave page."
    });

    dialogRef.disableClose = true; //disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      //console.log("The dialog was closed"); //nothing else to do
    });
  }

  constructor(
    private store: Store<fromStore.MainState>,
    iconService: IconsService,
    private mapsAPILoader: MapsAPILoader,
  ) {}

  setOption(location) {
    location.active = !location.active;
    this.store.dispatch(new fromStore.UpdateLocation(location));
  }

  removeOrAddLocation(location) {
    if (location.label === this.no_remove) {
      this.goToAddLocation();
      return;
    }

    let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
      width: "250px",
      data: "Are you sure you want to remove this location?"
    });
    //check if user is sure he wish to remove this location
    dialogRef.afterClosed().subscribe(result => {
      if (result === "confirm") {
        this.store.dispatch(new fromStore.RemoveLocation(location));
      }
    });
  }

  ngOnInit() {
    this.store
      .select<any>(fromStore.getContextSettingsOption)
      .subscribe(state => {
        this.which_page = state;
      });

    this.store
      .select<any>(fromStore.getUserLocations)
      .subscribe((locations: Location[]) => {
        this.locations=locations.slice();
      });

    
    //this.getCurrentLoc();
  }

  ngOnDestroy() {}

 /* getCurrentLoc() {
    if (this.userGotCurrLocDefined()) {
      return;
    }
    let address: string;
    let lat: number;
    let lng: number;

    //set current position
    if ("geolocation" in navigator) {
      this.mapsAPILoader.load().then(() => {
        navigator.geolocation.getCurrentPosition(position => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          console.log("lat = " + lat + ", long = " + lng);

       
          var geocoder = new google.maps.Geocoder();
          var latlng = { lat, lng };
          var splited;

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status.toString() === "OK") {
              if (results[0]) {
                splited = results[0].formatted_address.split(",");
                console.log(splited);

                address = splited[0];
                if (splited.length > 2) {
                  address = address.concat(", ");
                  address = address.concat(splited[1]);
                }

                console.log("address = " + address);

                this.new_location = {
                  label: this.no_remove,
                  address: address,
                  lat: lat,
                  long: lng,
                  active: true,
                  id: "-1"
                };

              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
        });
      });
    }
  }*/
}
