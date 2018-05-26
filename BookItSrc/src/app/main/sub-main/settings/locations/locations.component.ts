import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";
import { Observable } from "rxjs/Observable";
import { MatIconRegistry } from "@angular/material/icon";
import { IconsService } from "./../../../../icons.service";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../dialog-one-button/dialog-one-button.component";
import { DialogTwoButtonComponent } from "../dialog-two-button/dialog-two-button.component";
import {location} from "../settings.component";

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
  providers: [IconsService]
})
export class LocationsComponent implements OnInit {
  public which_page = "locations"; /* options = {settings, categories, locations, add_location} */
  public settingsOption$: Observable<string>;
  public cntEnabled = 1;
  public rc = 0;
  public no_remove = "Current Location";

  @Input() locations : location[]; //get locations array from settings
  @Output() changed : EventEmitter<location[]> = new EventEmitter<location[]>();

  goToSettings() {
    if (this.cntEnabled === 0) this.openDialog_1();
    else this.store.dispatch(new fromStore.ChooseSettings());
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

    dialogRef.disableClose = true;//disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed"); //nothing else to do
    });
  }

  openDialog_2(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: "250px",
      data: "You can't remove current location!"
    });

    dialogRef.disableClose = true;//disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed"); //nothing else to do
    });
  }

  constructor(
    private store: Store<fromStore.MainState>,
    iconService: IconsService,
    public dialog: MatDialog
  ) {}

  setOption(name) {
    let _locations = this.locations.slice(0);

    for (var _i = 0; _i < _locations.length; _i++) {
      if (_locations[_i].name === name) {
        _locations[_i].enabled = !_locations[_i].enabled;

        if (_locations[_i].enabled) this.cntEnabled++;
        else this.cntEnabled--;
      }
    }

    this.changed.emit(_locations);
  }

  addLocation(loc:location) {
    let _locations = this.locations.slice(0);

    _locations.push(loc);

    this.changed.emit(_locations);    
  }

  removeLocation(name) {
    if(name === this.no_remove){
      this.openDialog_2();
      return;
    }

    let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
      width: "250px",
      data: "Are you sure you want to remove this location?"
    });

    //check if user is sure he wish to remove this location
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed -" + result);
      if(result === "confirm"){
        console.log("remove location - " + name);

        let _locations = this.locations.slice(0);
        
        for (var _i = 0; _i < _locations.length; _i++) {
          if (_locations[_i].name === name) {
            if (_locations[_i].enabled) 
              this.cntEnabled--;
            
            //YUVAL
            //this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.REMOVE_LOCATION, _locations[_i]));

            _locations.splice(_i, 1);
          }
        }

        this.changed.emit(_locations);
      }
      else{
        console.log("cancel, do nothing");
      }
    });
  }

  ngOnInit() {
    this.settingsOption$ = this.store.select(
      fromStore.getContextSettingsOption
    );
    this.store
      .select<any>(fromStore.getContextSettingsOption)
      .subscribe(state => {
        this.which_page = state;

        //YUVAL
        /*.select<any>(fromStore.getContextLocations)
        .subscribe(state => {
          this.locations = state;*/
      });
  }

  ngOnDestroy(){
    
  }
}
