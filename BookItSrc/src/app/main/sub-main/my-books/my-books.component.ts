import { Book } from './../../../data_types/states.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';
import { MatGridListModule } from '@angular/material/grid-list';
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

  goToAddbook() {
    this.store.dispatch(new fromStore.ChooseMyBooksAddBook);
  }



  ngOnInit() {
    this.mybooksOption$ = this.store.select(fromStore.getContextmybooksOption);
    this.store.select<any>(fromStore.getContextmybooksOption).subscribe(state => { this.which_page = state; });
    this.store.dispatch(new fromStore.LoadMyBooks());
    this.userBooksSubscription = this.store.select<any>(fromStore.getUserBooks).subscribe(state => { this.userBooks = state; });
  }

  ngOnDestroy() {
    this.userBooksSubscription.unsubscribe();
  }

}
