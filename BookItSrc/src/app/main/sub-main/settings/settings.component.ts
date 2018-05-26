
import { UserDataState,UserUpdateType } from './../../../data_types/states.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';
import { DialogTwoButtonComponent } from "./dialog-two-button/dialog-two-button.component";
import { DialogOneButtonComponent } from "./dialog-one-button/dialog-one-button.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  public which_page = "settings"; /* options = {settings, categories, locations, add_location} */
  public settingsOption$: Observable<string>;
  public userData:UserDataState;

  categories : string[];

  x1 : location = new location("Current Location", "Tel Aviv, namir", 0, 0, true);
  x2 : location = new location("Home", "Tel Aviv, Haim Levanon", 0, 0, false);
  x3 : location = new location("Work", "Givaataim, Katzanelson", 0, 0, false);

  locations = [
    this.x1,
    this.x2, 
    this.x3
    ];

  /* global */
  checked = false;
  indeterminate = false;
  align = "start";
  disabled = false;

  /* search radius parameters */
  max = 30;
  min = 0.5;
  step = 0.5;
  thumbLabel = true;
  
  /* Slide */
  slide_checked = true;
  share_enabled = true;

  logout(){
    this.store.dispatch(new fromStore.Logout());
  }

  /*slideClicked() {
    console.log("1 slide_checked = " + this.slide_checked);
    this.slide_checked = !this.slide_checked;
    if (this.share_enabled === true) {
      //this.slide_checked = false; //prevent slide from going to unchecked
      console.log("2 slide_checked = " + this.slide_checked);
      //check if user is sure he wish to not share his books
      let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
        width: "250px",
        data: "We're sorry to see you chose not to share your books! We hope to see you book sharing very soon."
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result === "confirm") {
          console.log("confirm -> set stop sharing");
          this.share_enabled = false;
          this.slide_checked = true;
        } else {
          console.log("cancel -> set share");
          this.share_enabled = true;
          this.slide_checked = false;
        }
      });;
    }
    else{
      console.log("3 slide_checked = " + this.slide_checked);
      let dialogRef = this.dialog.open(DialogOneButtonComponent, {
        width: "250px",
        data:
          "We're glad to see you chose to share your books again!"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log("The start sharing dialog was closed"); 
        this.share_enabled = true;
        this.slide_checked = true;
      });
    }
  }*/

  goToLocations() {
    this.store.dispatch(new fromStore.ChooseSettingsLocations);
  }

  goToCategories() {
    this.store.dispatch(new fromStore.ChooseSettingsCategories);
  }

  updateSearchRadiusKm(){
    let newValue = this.userData.locationSettings.searchRadiusKm;
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.SEARCH_RADIUS_KM, newValue));
  }

  updateShareMyBooks(){
    let newValue = this.userData.info.shareMyBooks;
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.SHARE_MY_BOOKS,newValue ));
  }

  constructor(private store: Store<fromStore.MainState>, public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
    this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state => { this.which_page = state; })
    this.store.select<any>(fromStore.getUserData).subscribe(state => { this.userData = state; })
  }

  ngOnDestroy(){
    
  }
}

export class location{
  name: string;
  address: string;
  enabled: boolean;
  latitude: number;
  longitude: number;

  constructor(_name, _address, _latitude, _longitude, _enabled){
    this.name = _name;
    this.address = _address;
    this.enabled = _enabled;
    this.latitude = _latitude;
    this.longitude = _longitude;
  }
}
