import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../../store";
import { Observable } from "rxjs/Observable";
import { MatIconRegistry } from "@angular/material/icon";
import { IconsService } from "./../../../../../icons.service";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { ElementRef, NgZone, ViewChild } from '@angular/core';

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
  public place_holder : string = "Start typing address";
  public address_text : any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  public which_page = "add_locations"; /* options = {settings, categories, locations, add_location} */
  public settingsOption$: Observable<string>;

  constructor(
    private store: Store<fromStore.MainState>,
    iconService: IconsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  goToLocations() {
    this.store.dispatch(new fromStore.ChooseSettingsLocations());
  }

  addLocation() {
    console.log("called! address_text = " + this.address_text);
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
        strictBounds: true
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.address_text = place.adr_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
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
