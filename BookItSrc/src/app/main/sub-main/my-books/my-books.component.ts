import { getUserDataStatus } from './../../../store/reducers/index';
import { Book, Loadable } from './../../../data_types/states.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBar} from '@angular/material';
import { IconsService } from '../../../icons.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  providers: [IconsService]
})
export class MyBooksComponent implements OnInit {
  getUserDataStatusSubscription;
  whichPageSubscription;
  public which_page = 'my_books'; /* options = {my_books, add_book, my_books_chat} */
  messegeSubscription;

  constructor(private store: Store<fromStore.MainState>,iconService: IconsService,public snackBar: MatSnackBar) { }
  public mybooksOption$: Observable<string>;
  userBooks: Book[];
  userBooksSubscription;
  numCols;
  bookNavBarEnabled:boolean;
  bookSelected:Book;
  public status:Loadable;
  public bookNavbarCols=2;

  goToAddbook() {
    this.store.dispatch(new fromStore.ChooseMyBooksAddBook);
  }

  onResize() {//TODO add font resize
    if (window.innerWidth <= 400){
      this.numCols=3;
    }
    else if (window.innerWidth > 400 &&  window.innerWidth<800){
      this.numCols=4;
    }
    else{
      this.numCols=6;
    }
  }

  
  showBookNavbar(book:Book){
    this.bookNavBarEnabled=true;
    this.bookSelected=book;
    this.bookNavbarCols=2;
    if (book.currentRequest && book.currentRequest.pending && !book.currentRequest.approved){
      this.bookNavbarCols=5;
    }
    else if(book.currentRequest && !book.currentRequest.pending && book.currentRequest.approved){
      this.bookNavbarCols=5;
    }
    return;
  }
  hideBookNavbar(book:Book){
    if(book==this.bookSelected){
      this.bookNavBarEnabled=false;
      this.bookSelected=undefined;
    }
  }
  removeBook(){
    //this.userBooks.splice(this.userBooks.indexOf(this.bookSelected),1);
    this.store.dispatch(new fromStore.RemoveBook(this.bookSelected));
    this.bookNavBarEnabled=false;
    this.bookSelected=undefined;
    
  }
  approveRequest(book:Book){
    book.currentRequest.pending=false;
    book.currentRequest.approved=true;
    this.store.dispatch(new fromStore.UpdateBook(book));
    this.bookNavBarEnabled=false;
    
  }
  rejectRequest(book:Book){
    book.currentRequest.pending=false;
    book.currentRequest.approved=false;
    this.store.dispatch(new fromStore.UpdateBook(book));
    this.hideBookNavbar(book);
    
  }
  showUser(){
    console.log('showing user');

  }

  startChat(){
    console.log('opening chat');
    this.store.dispatch(new fromStore.ChooseMyBooksChat);
    
  }

  ngOnInit() {
    this.bookNavBarEnabled=false;
    this.onResize();
    this.whichPageSubscription=this.store.select<any>(fromStore.getContextmybooksOption).subscribe(state => { this.which_page = state; });
    this.store.dispatch(new fromStore.LoadMyBooks());
    this.userBooksSubscription = this.store.select<any>(fromStore.getUserBooks).subscribe(state => { this.userBooks = state; });
    this.getUserDataStatusSubscription=this.store.select(fromStore.getUserDataStatus).subscribe(state=>{this.status=state;});
    this.messegeSubscription = this.store.select(fromStore.getMessege).subscribe((state) => {
      if (state && state!=='') {
        this.snackBar.open(state, null, { duration: 1000 });
        setTimeout(this.store.dispatch(new fromStore.ShowMessege('')),0);
      }
    });
    
  }

  ngOnDestroy() {
    this.whichPageSubscription.unsubscribe();
    this.userBooksSubscription.unsubscribe();
    this.getUserDataStatusSubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
    this.hideBookNavbar(this.bookSelected);
  }

}
