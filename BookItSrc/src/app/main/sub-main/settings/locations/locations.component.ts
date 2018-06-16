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
  public no_remove = "My Current Location";
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
    public dialog: MatDialog
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

    //remove location
    this.store.dispatch(new fromStore.RemoveLocation(location));
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
  }

  ngOnDestroy() {}

}
