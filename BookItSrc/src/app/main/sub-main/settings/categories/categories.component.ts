import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";
import { Observable } from "rxjs/Observable";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../dialog-one-button/dialog-one-button.component";

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
  public randNums = [0, 0, 0, 0, 0, 0, 0]; /* lucky number 7 */

  /* mat chips */
  bookCategories = [
    { name: 'Love', active: false},
    { name: 'Food', active: false},
    { name: 'Hate', active: false},
    { name: 'Computers', active: false},
    { name: 'History', active: false},
    { name: 'Music', active: false},
    { name: 'Biographies', active: false},
    { name: 'Cooking', active: false },
    { name: 'Health', active: false},
    { name: 'Arts', active: false },
    { name: 'Business', active: false},
    { name: 'Kids', active: false},
    { name: 'Comics', active: false},
    { name: 'Hobbies', active: false },
    { name: 'Reference', active: false}, 
    { name: 'Home', active: false},
    { name: 'Garden', active: false },
    { name: 'Horror', active: false},
    { name: 'Entertainment', active: false},
    { name: 'Medical', active: false},
    { name: 'Social Sciences', active: false },
    { name: 'Religion', active: false },
    { name: 'Teen', active: false },
    { name: 'Self-Help', active: false },
    { name: 'Sports', active: false },
    { name: 'Romance', active: false },
    { name: 'Mysteries', active: false },
    { name: 'Parenting', active: false },
    { name: 'Travel', active: false },
    { name: 'Fantasy', active: false },
    { name: 'True Crime', active: false },
    { name: 'Westerns', active: false },
    { name: 'Other', active: false }];

  goToSettings() {
    this.store.dispatch(new fromStore.ChooseSettings());
  }

  chipClicked(name) {
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
    for (var _i = 0; _i < 7; ) {
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!this.bookCategories[rand].active) {
        this.bookCategories[rand].active = true;
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
      return "accent";
    }
    return "primary";
  }

  constructor(private store: Store<fromStore.MainState>, public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: '250px',
      data: "You didnt pick any category! please pick one before you leave page."
    });

    dialogRef.disableClose = true;//disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); //nothing else to do
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
  }
  ngOnChanges() {
    console.log("categories changed");
  }
  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }
}
