import { getUsersNearBy } from './../../../store/reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  public usersNearBy = [];
  private usersNearBySubscription;
  public booksNearBy = [];
  private booksNearBySubscription;
  numCols;

  constructor(private store: Store<fromStore.MainState>) { }
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
  ngOnInit() {
    this.booksNearBySubscription = this.store.select<any>(fromStore.getBooksNearBy).subscribe(state => { this.booksNearBy = state; });
    this.usersNearBySubscription = this.store.select<any>(fromStore.getUsersNearBy).subscribe(state => { this.usersNearBy = state; });
    //if (this.usersNearBy.length > 0) {
    this.store.dispatch(new fromStore.LoadBooksFromUsersNearBy(this.usersNearBy));
    this.numCols=1;
    //}

  }
  ngOnDestroy() {
    this.usersNearBySubscription.unsubscribe();
    this.booksNearBySubscription.unsubscribe();
  }

}
