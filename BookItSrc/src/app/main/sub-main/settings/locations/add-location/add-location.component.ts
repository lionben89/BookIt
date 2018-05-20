import { DialogAddLocationTitleComponent } from './../../dialog-add-location-title/dialog-add-location-title.component';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../../store";
import { Observable } from "rxjs/Observable";
import { MatIconRegistry } from "@angular/material/icon";
import { IconsService } from "./../../../../../icons.service";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import {location} from "../../settings.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.scss"],
  providers: [IconsService]
})
export class AddLocationComponent implements OnInit {
  /* Tel Aviv University langtitude and latitude */
  public latitude: number = 32.1133141;
  public longitude: number = 34.80438770000001;
  public searchControl: FormControl = new FormControl();
  public zoom: number = 15;
  public address_text : string;
  public place_holder : string = "Start typing address";
  public new_location : location;
  public new_location_street : string;
  public new_location_city : string;
  public new_location_name : string;

  @Input() locations : location[]; //get locations array from settings
  @Output() add : EventEmitter<location> = new EventEmitter<location>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

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
    let dialogRef = this.dialog.open(DialogAddLocationTitleComponent, {
      width: "250px",
      data: { street: this.new_location_street, city: this.new_location_city }
    });

    dialogRef.disableClose = true;//disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed, picked name - ", result);
      this.new_location_name = result; 
    });
  }

  goToLocations() {
    this.store.dispatch(new fromStore.ChooseSettingsLocations());
  }

  addLocation() {
    this.openDialog_add_title(); //let user pick location name first!

    console.log("called! name = " + this.new_location_name + " city, street = " + this.new_location_city + ", " + this.new_location_street);

    this.new_location = new location(this.new_location_name, this.new_location_city, this.new_location_street, true);

    this.add.emit(this.new_location);
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
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: {country: 'il'},
        strictBounds: true,
        types: ['address']
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let splited = place.formatted_address.split(',');
          
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom 
          this.address_text = place.adr_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;

          console.log("splied.length = " + splited.length);
          if(splited.length == 2){
            console.log("no street");
            this.new_location_city = splited[0];
            this.new_location_street = "";
          }
          else if(splited.length == 3){
            this.new_location_street = splited[0];
            this.new_location_city = splited[1];
          }  
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }  
}
