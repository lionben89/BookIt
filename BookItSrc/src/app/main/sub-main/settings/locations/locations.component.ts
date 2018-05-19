import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";
import { Observable } from "rxjs/Observable";
import { MatIconRegistry } from "@angular/material/icon";
import { IconsService } from "./../../../../icons.service";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../dialog-one-button/dialog-one-button.component";
import { DialogTwoButtonComponent } from "../dialog-two-button/dialog-two-button.component";

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
  public no_remove = "My Currect Location";

  userLocations = [
    {
      name: "My Currect Location",
      city: "Tel Aviv",
      street: "Namir",
      enabled: true
    },
    { name: "Home", city: "Tel Aviv", street: "Haim Levanon", enabled: false },
    { name: "Work", city: "Givaataim", street: "Katzanelson", enabled: false },
    {
      name: "Good books area",
      city: "Haifa",
      street: "Hageffen",
      enabled: false
    },
    { name: "Vacation north", city: "Metula", street: "Rimon", enabled: false }
  ];

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

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed"); //nothing else to do
    });
  }

  openDialog_2(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: "250px",
      data: "You can't remove current location!"
    });

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
    for (var _i = 0; _i < this.userLocations.length; _i++) {
      if (this.userLocations[_i].name === name) {
        this.userLocations[_i].enabled = !this.userLocations[_i].enabled;

        if (this.userLocations[_i].enabled) this.cntEnabled++;
        else this.cntEnabled--;
      }
    }
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
        
        for (var _i = 0; _i < this.userLocations.length; _i++) {
          if (this.userLocations[_i].name === name) {
            if (this.userLocations[_i].enabled) this.cntEnabled--;
            this.userLocations.splice(_i, 1);
          }
        }
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
      });
  }
}
