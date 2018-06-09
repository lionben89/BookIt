
import { UserSettingsState, UserUpdateType, Book } from './../../../data_types/states.model';
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
  public userSettings:UserSettingsState;
  booksNearBySubscription;

  categories : string[];

  /* global */
  checked = false;
  indeterminate = false;
  align = "start";
  disabled = false;

  userSettingsSubscription;

  /* search radius parameters */
  max = 30;
  min = 0.5;
  step = 0.5;
  thumbLabel = true;
  
  /* Slide */
  slide_checked = true;
  share_enabled = true;
  categoriesNames;

  
  sortBooksByCategories(books) {

    let categories={};
    this.categoriesNames=[];
    
    books.forEach((book: Book) => {
      book.categories.forEach((cat) => {
        if (categories && categories[cat]) {
          categories[cat].push(book);
        }
        else {
          categories[cat] = [];
          categories[cat].push(book);
          this.categoriesNames.push({name:cat,active:true})
        }
      })

    });
    
    
    
    
  }

  logout(){
    this.userSettingsSubscription.unsubscribe();
    this.store.dispatch(new fromStore.Logout());
  }


  goToLocations() {
    this.store.dispatch(new fromStore.ChooseSettingsLocations);
  }

  goToCategories() {
    this.store.dispatch(new fromStore.ChooseSettingsCategories);
  }

  updateSearchRadiusKm(){
    let newValue = this.userSettings.locationSettings.searchRadiusKm;
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.SEARCH_RADIUS_KM, newValue));
  }

  updateShareMyBooks(){
    let newValue = this.userSettings.info.shareMyBooks;
    this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.SHARE_MY_BOOKS,newValue ));
  }

  constructor(private store: Store<fromStore.MainState>, public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
    this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state => { this.which_page = state; });
    this.userSettingsSubscription=this.store.select<any>(fromStore.getUserSettings).subscribe(state => { this.userSettings = state; });
    this.booksNearBySubscription = this.store.select<any>(fromStore.getBooksNearBy).subscribe(state => {
      this.sortBooksByCategories(state);
    });
  }

  ngOnDestroy(){
    this.userSettingsSubscription.unsubscribe();
    this.booksNearBySubscription.unsubscribe();
  }
}
