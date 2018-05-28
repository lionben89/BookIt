import { Book } from './../../../data_types/states.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';
import { MatGridListModule } from '@angular/material/grid-list';
//import { ClickOutsideModule } from 'ng-click-outside';
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  public which_page = 'my_books'; /* options = {my_books, add_book} */
  public mybooksOption$: Observable<string>;
  constructor(private store: Store<fromStore.MainState>) { }
  userBooks: Book[];
  userBooksSubscription;
  numCols;
  bookNavBarEnabled:boolean;
  bookSelected:Book;
  goToAddbook() {
    this.store.dispatch(new fromStore.ChooseMyBooksAddBook);
  }

  onResize() {
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
  }
  hideBookNavbar(book:Book){
    if(book==this.bookSelected){
      this.bookNavBarEnabled=false;
      this.bookSelected=undefined;
    }
  }
  removeBook(){
    this.userBooks.splice(this.userBooks.indexOf(this.bookSelected),1);
    this.bookNavBarEnabled=false;
    this.bookSelected=undefined;
  }
  approveRequest(){
    console.log('request approved');
  }
  rejectRequest(){
    console.log('request rejected');
  }
  showUser(){
    console.log('showing user');

  }
  startChat(){
    console.log('opening chat');
  }
  ngOnInit() {
    this.bookNavBarEnabled=false;
    this.onResize();
    this.mybooksOption$ = this.store.select(fromStore.getContextmybooksOption);
    this.store.select<any>(fromStore.getContextmybooksOption).subscribe(state => { this.which_page = state; });
    this.store.dispatch(new fromStore.LoadMyBooks());
    this.userBooksSubscription = this.store.select<any>(fromStore.getUserBooks).subscribe(state => { this.userBooks = state; });
  }

  ngOnDestroy() {
    this.userBooksSubscription.unsubscribe();
  }

}
