import { getUserDataStatus } from './../../../store/reducers/index';
import { Book, Loadable } from './../../../data_types/states.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material';
import { IconsService } from '../../../icons.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  providers:[IconsService]
})
export class MyRequestsComponent implements OnInit {

  myRequests: Book[];
  myRequestsSubscription;
  public which_page = 'my_requests'; /* option = {my_requests, my_requests_chat} */
  numCols;
  bookNavBarEnabled;
  bookSelected: Book;
  public bookNavbarCols = 2;
  messegeSubscription;
  whichPageSubscription;

  constructor(private store: Store<fromStore.MainState>, iconService: IconsService, public snackBar: MatSnackBar) { }


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

  startChat(){
    console.log('opening chat');
    this.store.dispatch(new fromStore.ChooseMyRequestsChat);
    this.bookNavBarEnabled = false;
    
  }

  hideBookNavbar(book: Book) {
    if (book == this.bookSelected) {
      this.bookNavBarEnabled = false;
      this.bookSelected = undefined;
    }
  }

  removeRequest() {
    this.store.dispatch(new fromStore.RemoveRequestBook(this.bookSelected));
    this.hideBookNavbar(this.bookSelected);

  }

  showBookNavbar(book: Book) {
    this.bookNavBarEnabled = true;
    this.bookSelected = book;
    this.bookNavbarCols = 3;
    if (book.currentRequest && !book.currentRequest.pending && book.currentRequest.approved) {
      this.bookNavbarCols = 4;
    }
    return;
  }

  ngOnInit() {
    this.myRequestsSubscription = this.store.select(fromStore.getUserRequests).subscribe((state) => { this.myRequests = state; })
    this.messegeSubscription = this.store.select(fromStore.getMessege).subscribe((state) => {
      if (state && state!=='') {
        this.snackBar.open(state, null, { duration: 1000 });
        setTimeout(this.store.dispatch(new fromStore.ShowMessege('')),0);
      }
    })
    this.bookNavBarEnabled = false;
    this.whichPageSubscription=this.store.select<any>(fromStore.getContextmyRequestsOption).subscribe(state => { this.which_page = state; });
    this.onResize();
    
  }
  ngOnDestroy() {
    this.myRequestsSubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
    this.whichPageSubscription.unsubscribe();
    this.hideBookNavbar(this.bookSelected);
  }

}
