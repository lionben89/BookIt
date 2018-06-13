import { Component, OnInit ,Input} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";
import { Observable } from "rxjs/Observable";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../dialog-one-button/dialog-one-button.component";
import { UserUpdateType, UserSettingsState } from "../../../../data_types/states.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  //public which_page = 'categories'; /* options = {settings, categories, locations} */
  public which_page$: Observable<string>;
  public userDataSubscription;
  public userData;
  color: string;
  userSettingsSubscription;
  userSettings: UserSettingsState;

  /* mat chips */
  @Input() bookCategories;

  goToSettings() {
    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      if(this.bookCategories[_i].active){
        this.store.dispatch(new fromStore.ChooseSettings());
        return;
      }
    }

    if(this.bookCategories.length == 0){ 
      /* no categories to pick from, dont inform */
      this.store.dispatch(new fromStore.ChooseSettings());
      return;
    }

    /* user didnt pick any categories inform him */
    this.openDialog();    
  }

  chipClicked(name) {

    console.log("bookCategories.length = " + this.bookCategories.length);

    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      if (this.bookCategories[_i].name === name) {
        this.bookCategories[_i].active = !this.bookCategories[_i].active;
        this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.CATEGORIES,this.bookCategories));
      }
    }
  }

  pickForUser() {
    let max = this.bookCategories.length - 1;
    let min = 0;
    let num_active = 0;

    switch(this.bookCategories.length)
    {
        case 0:
        {
          console.log("no categories. do nothing.");
          return;
        }
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        {
          num_active = (this.bookCategories.length + 2) / 3;
          break;
        }
        default:
          num_active = this.bookCategories.length / 3;
    }

    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      this.bookCategories[_i].active = false;
    }
    for (var _i = 0; _i < num_active; ) {
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!this.bookCategories[rand].active) {
        this.bookCategories[rand].active = true;
        _i++;
      }
    }
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.CATEGORIES,this.bookCategories));
  }

  pickAll() {
    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      this.bookCategories[_i].active = true;
    }
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.CATEGORIES,this.bookCategories));
  }

  unpickAll() {
    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      this.bookCategories[_i].active = false;
    }
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.CATEGORIES,this.bookCategories));
  }

  chipColor(active: boolean) {
    if (active) {
      return "accent";
    }
    return "primary";
  }

  constructor(private store: Store<fromStore.MainState>, public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: '250px',
      data: "Pay attention, you didnt pick any category."
    });

    dialogRef.disableClose = true;//disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); 
      this.store.dispatch(new fromStore.ChooseSettings());
    });
  }

  ngOnInit() {
    this.which_page$ = this.store.select<any>(
      fromStore.getContextSettingsOption
    );
    this.userDataSubscription = this.store
      .select<any>(fromStore.getUserData)
      .subscribe(state => {
        this.userData = state;
      });
      this.userSettingsSubscription = this.store.select<any>(fromStore.getUserSettings).subscribe(state => {
        this.userSettings = state; 
       }
     );


    this.initCategories();
  }

  initCategories(){
    if(this.userSettings.favoriteCategories){
      console.log("favoriteCategories init already");
      return;
    }

    /* In case user didnt pick categories yet, pick all for him */
    this.pickAll();
  }

  ngOnChanges() {
    console.log("categories changed");
  }
  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }
}
