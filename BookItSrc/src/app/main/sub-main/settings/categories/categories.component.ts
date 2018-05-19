import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  //public which_page = 'categories'; /* options = {settings, categories, locations} */
  public which_page$:Observable<string>;
  public userDataSubscription;
  public userData;
  color: string;
  public randNums = [0, 0, 0, 0, 0, 0, 0]; /* lucky number 7 */

  /* mat chips */
  bookCategories = [];

  goToSettings() {
    this.store.dispatch(new fromStore.ChooseSettings);
  }

  chipedClicked(name) {
    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      if (this.bookCategories[_i].name === name) {
        this.bookCategories[_i].active = !this.bookCategories[_i].active;
      }
    }
  }

  pickForUser() {
    var max = this.bookCategories.length - 1;
    var min = 0;

    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      this.bookCategories[_i].active = false;
    }
    for (var _i = 0; _i < 7;) {
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;;
      if (!this.bookCategories[rand].clicked) {
        this.bookCategories[rand].active = true;
        //this.bookCategories[rand].color = 'accent';
        _i++;
      }
    }
  }

  pickAll() {
    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      this.bookCategories[_i].active = true;
    }
  }

  unpickAll() {
    for (var _i = 0; _i < this.bookCategories.length; _i++) {
      this.bookCategories[_i].active = false;
    }
  }

  chipColor(active: boolean) {
    if (active) {
      return 'accent';
    }
    return 'primary';
  }

  constructor(private store: Store<fromStore.MainState>) { }


  ngOnInit() {
    this.which_page$=this.store.select<any>(fromStore.getContextSettingsOption);
    this.userDataSubscription=this.store.select<any>(fromStore.getUserData).subscribe(state => { this.userData = state; })
  }
  ngOnChanges() {
    console.log("categories changed");
  }
  ngOnDestroy(){
    this.userDataSubscription.unsubscribe();
  }

}
