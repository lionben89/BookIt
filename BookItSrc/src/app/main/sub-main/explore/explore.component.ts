
import { getUsersNearBy } from './../../../store/reducers/index';
import { Component, OnInit, Output, Input, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Book, Loadable, UserSettingsState } from './../../../data_types/states.model';
import { IconsService } from '../../../icons.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../settings/dialog-one-button/dialog-one-button.component";
import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [IconsService],
  encapsulation: ViewEncapsulation.None
})
export class ExploreComponent implements OnInit  {
  public usersNearBy = [];
  private usersNearBySubscription;
  public booksNearBy = [];  
  private booksNearBySubscription;
  public numCols;
  public bookNavBarEnabled: boolean;
  public bookSelected: Book;
  public status: Loadable;
  messegeSubscription;
  categories = {};
  categoriesNames;
  currentCategory;
  userSettingsSubscription;
  userSettings: UserSettingsState;
  private IsAllowToRequest;
  private IsAllowToRequestSubscription;


  constructor(private store: Store<fromStore.MainState>, iconService: IconsService, public snackBar: MatSnackBar,public dialog: MatDialog ) {
    
  }
  showBookNavbar(book: Book) {
    this.bookNavBarEnabled = true;
    this.bookSelected = book;
    document.body.style.overflow="hidden";
  }
  hideBookNavbar(book: Book) {
    if (book === this.bookSelected) {
      this.bookNavBarEnabled = false;
      this.bookSelected = undefined;
      document.body.style.overflow="scroll";
    }
  }
  isBookEquale = (book1, book2) => {
    let eq = true;
    let keys = Object.keys(book1);
    for (let key of keys) {
      if (book1[key] !== book2[key]) {
        eq = false;
        break;
      }
    }
    return eq;
  }

  goToPrevCategory() {
    let c = (this.currentCategory - 1);
    if (c < 0) {
      c = this.categoriesNames.length - 1;
    }
    this.store.dispatch(new fromStore.ChooseCurrentCategory(c));
  }
  goToNextCategory() {
    let c = (this.currentCategory + 1);
    if (c === this.categoriesNames.length) {
      c = 0;
    }
    this.store.dispatch(new fromStore.ChooseCurrentCategory(c));
  }
  bookInfo() {
    console.log(this.bookSelected.description);
  }
  requestBook(book) {
    if (this.IsAllowToRequest) {
      this.store.dispatch(new fromStore.RequestBook(book));
      this.hideBookNavbar(book);
    }
    else{
      let dialogRef = this.dialog.open(DialogOneButtonComponent, {
        width: '250px',
        data: "You reached the maximum requests number, please share more books or return the others"
      });
  
      dialogRef.disableClose = true;//disable default close operation
    }


  }
  onResize() {//TODO add font resize
    if (window.innerWidth <= 400) {
      this.numCols = 3;
    }
    else if (window.innerWidth > 400 && window.innerWidth < 800) {
      this.numCols = 4;
    }
    else {
      this.numCols = 6;
    }
  }

  sortBooksByCategories(books) {

    this.categories = {};
    this.categories["All"] = books;
    books.forEach((book: Book) => {
      book.categories.forEach((cat) => {
        if (this.categories && this.categories[cat]) {
          this.categories[cat].push(book);
        }
        else {
          let ex = false;
          if (this.userSettings && this.userSettings.favoriteCategories && this.userSettings.favoriteCategories.categories) {
            this.userSettings.favoriteCategories.categories.forEach((c) => {
              if (cat === c.name && c.active) {
                ex = true;
              }
            })
          }
          if (ex) {
            this.categories[cat] = [];
            this.categories[cat].push(book);
          }
        }
      })

    });

    this.categoriesNames = Object.keys(this.categories);


  }
  getAutoCompleteValue(bookSelected) {
    if (bookSelected && bookSelected.title) {
      return bookSelected
    }
    else {
      return null;
    }
  }
  ngOnInit() {
    this.bookNavBarEnabled = false;
    this.onResize();
    this.userSettingsSubscription = this.store.select<any>(fromStore.getUserSettings).subscribe(state => {
      this.userSettings = state;
      //this.sortBooksByCategories(this.categories["All"]);
    }
    );
    this.booksNearBySubscription = this.store.select<any>(fromStore.getBooksNearBy).subscribe(state => {
      this.sortBooksByCategories(state);
    });
    this.usersNearBySubscription = this.store.select<any>(fromStore.getUsersNearBy).subscribe(state => {
      this.usersNearBy = state;
      this.store.dispatch(new fromStore.LoadBooksFromUsersNearBy(this.usersNearBy));
    });
    this.store.select(fromStore.getExploreStatus).subscribe(state => { this.status = state; });
    this.messegeSubscription = this.store.select(fromStore.getMessege).subscribe((state) => {
      if (state && state !== '') {
        this.snackBar.open(state, null, { duration: 3000 });
        setTimeout(this.store.dispatch(new fromStore.ShowMessege('')), 0);
      }
    })
    this.store.select(fromStore.getContextCurrentCategory).subscribe(state => {
      this.currentCategory = state;
    });
    this.IsAllowToRequestSubscription = this.store.select(fromStore.IsAllowToRequest).subscribe(
      (state) => {
        this.IsAllowToRequest = state;
      }
    );


  }
  ngOnDestroy() {
    this.usersNearBySubscription.unsubscribe();
    this.booksNearBySubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
    this.userSettingsSubscription.unsubscribe();
    this.IsAllowToRequestSubscription.unsubscribe();
  }

}
