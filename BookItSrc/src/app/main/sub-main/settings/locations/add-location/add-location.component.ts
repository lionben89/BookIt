import { DialogAddLocationTitleComponent } from "./../../dialog-add-location-title/dialog-add-location-title.component";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../../store";
import { Observable } from "rxjs/Observable";
import { MatIconRegistry } from "@angular/material/icon";
import { IconsService } from "./../../../../../icons.service";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms";
import { ElementRef, NgZone, ViewChild } from "@angular/core";
import { Location } from "../../../../../data_types/states.model";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../../dialog-one-button/dialog-one-button.component";
import { concat } from "rxjs/operators";

@Component({
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.scss"],
  providers: [IconsService]
})
export class AddLocationComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl = new FormControl();
  public zoom: number = 15;
  public address_text: string;
  public place_holder: string = "Start typing address";
  public new_location: Location;
  public new_location_address: string;
  public new_location_name: string = "";
  public new_location_lat: number;
  public new_location_long: number;
  public empty_location: boolean = true;
  public saved_string = "Current Location";
  public first_diag = true;

  @ViewChild("search") public searchElementRef: ElementRef;

  public searchValue;

  public which_page = "add_locations"; /* options = {settings, categories, locations, add_location} */
  public settingsOption$: Observable<string>;

  constructor(
    private store: Store<fromStore.MainState>,
    iconService: IconsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  openDialog_add_title(): void {
    var _example_info = "i.e Home, Work etc";

    let dialogRef = this.dialog.open(DialogAddLocationTitleComponent, {
      width: "250px",
      data: {
        address: this.new_location_address,
        example_info: _example_info
      }
    });

    dialogRef.disableClose = true; //disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      var max = 5000;
      var min = 0;
      var temp: string = "";

      if (result.valueOf() == this.saved_string.valueOf()) {
        //need to change name
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;

        temp = result.concat("_");
        result = temp.concat(rand.toString());
      }

      this.new_location_name = result;

      this.addLocation(); //now add location
      this.goToLocations();
    });
  }

  goToLocations() {
    this.store.dispatch(new fromStore.ChooseSettingsLocations());
  }

  addLocationName() {
    if (this.empty_location) {
      this.openDialog_emptyLocation();
      return;
    }

    this.openDialog_add_title(); //let user pick location name
  }

  addLocation() {
    console.log(
      "Add new location : name = " +
        this.new_location_name +
        " address = " +
        this.new_location_address
    );

    this.new_location = {
      label: this.new_location_name,
      address: this.new_location_address,
      lat: this.new_location_lat,
      long: this.new_location_long,
      active: true,
    };

    this.store.dispatch(new fromStore.AddLocation(this.new_location));
  }

  ngOnInit() {
    this.settingsOption$ = this.store.select(
      fromStore.getContextSettingsOption
    );
    this.store
      .select<any>(fromStore.getContextSettingsOption)
      .subscribe(state => {
        this.which_page = state;
      });

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          componentRestrictions: { country: "il" },
          strictBounds: true,
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let splited = place.formatted_address.split(",");

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.address_text = place.adr_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.empty_location = false;
          this.new_location_lat = this.latitude;
          this.new_location_long = this.longitude;

          console.log("splited.length = " + splited.length);
          this.new_location_address = splited[0];
          if (splited.length > 2) {
            this.new_location_address = this.new_location_address.concat(", ");
            this.new_location_address = this.new_location_address.concat(splited[1]);
          }
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  ngOnDestroy() {
    
  }

  openDialog_emptyLocation(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: "250px",
      data: "Please choose location first!"
    });

    dialogRef.disableClose = true; //disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed"); //nothing else to do
    });
  }

  emptyLocText() {
    this.searchValue = "";
    this.empty_location = true;
  }
}
