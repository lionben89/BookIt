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

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
  providers: [IconsService]
})
export class LocationsComponent implements OnInit {
  public which_page = "locations"; /* options = {settings, categories, locations, add_location} */
  public settingsOption$: Observable<string>;
  public rc = 0;
  public no_remove = "Current Location";

  private locations = new Array<Location>();

  goToSettings() {
    for(let loc of this.locations){
      if(loc.active){
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
    public dialog: MatDialog) {}

  setOption(location) {
    location.active = !location.active;
    this.store.dispatch(new fromStore.UpdateLocation(location));
  }

  removeLocation(location) {
    if(location.label === this.no_remove){
      this.openDialog_2();
      return;
    }

    let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
      width: "250px",
      data: "Are you sure you want to remove this location?"
    });

    //check if user is sure he wish to remove this location
    dialogRef.afterClosed().subscribe(result => {
      if(result === "confirm") {
        this.store.dispatch(new fromStore.RemoveLocation(location));
      }
    });
  }

  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
    this.store.select<any>(fromStore.getContextSettingsOption)
      .subscribe(state => {
        this.which_page = state;
      });

    this.store.select<any>(fromStore.getUserLocations).subscribe((locations: Location[]) => { 
      this.locations = new Array<Location>();
      for (let location of locations) {
        this.locations.push(location);
      }
    });

    this.store.dispatch(new fromStore.LoadLocations());
  }

  ngOnDestroy(){
    
  }
}
