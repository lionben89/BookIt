
import { getUsersNearBy } from './../../../store/reducers/index';
import { Component, OnInit, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Book, Loadable } from './../../../data_types/states.model';
import { IconsService } from '../../../icons.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [IconsService]
})
export class ExploreComponent implements OnInit {
  public usersNearBy = [];
  private usersNearBySubscription;
  public booksNearBy = [];
  private booksNearBySubscription;
  public numCols;
  public bookNavBarEnabled: boolean;
  public bookSelected: Book;
  public status: Loadable;
  messegeSubscription;

  constructor(private store: Store<fromStore.MainState>, iconService: IconsService, public snackBar: MatSnackBar) {
  }
  showBookNavbar(book: Book) {
    this.bookNavBarEnabled = true;
    this.bookSelected = book;
  }
  hideBookNavbar(book: Book) {
    if (book === this.bookSelected) {
      this.bookNavBarEnabled = false;
      this.bookSelected = undefined;
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
    console.log("Prev Category");
  }
  goToNextCategory() {
    console.log("Next Category");
  }
  bookInfo() {
    console.log(this.bookSelected.description);
  }
  requestBook(book) {
    
    this.store.dispatch(new fromStore.RequestBook(book));
    this.hideBookNavbar(book);
    

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
    this.booksNearBySubscription = this.store.select<any>(fromStore.getBooksNearBy).subscribe(state => { 
      this.booksNearBy = state; });
    this.usersNearBySubscription = this.store.select<any>(fromStore.getUsersNearBy).subscribe(state => {
      this.usersNearBy = state;
      this.store.dispatch(new fromStore.LoadBooksFromUsersNearBy(this.usersNearBy));
    });
    this.store.select(fromStore.getExploreStatus).subscribe(state => { this.status = state; });
    this.messegeSubscription = this.store.select(fromStore.getMessege).subscribe((state) => {
      if (state && state !== '') {
        this.snackBar.open(state, null, { duration: 1000 });
        setTimeout(this.store.dispatch(new fromStore.ShowMessege('')), 0);
      }
    })
    //if (this.usersNearBy.length > 0) {

    //this.numCols=1;
    //}

  }
  ngOnDestroy() {
    this.usersNearBySubscription.unsubscribe();
    this.booksNearBySubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
  }

}
