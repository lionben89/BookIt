import { getUserDataStatus } from './../../../../store/reducers/index';
import { Book, Loadable } from './../../../../data_types/states.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBar} from '@angular/material';
import { IconsService } from '../../../../icons.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  myRequests:Book[];
  myRequestsSubscription;
  public which_page = 'my_requests';
  numCols;
  bookNavBarEnabled;
  bookSelected:Book;
  public bookNavbarCols=2;

  constructor(private store: Store<fromStore.MainState>,iconService: IconsService,public snackBar: MatSnackBar) { }


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

  removeRequest(){
    console.log("remove request")
  }

   
  showBookNavbar(book:Book){
    this.bookNavBarEnabled=true;
    this.bookSelected=book;
    this.bookNavbarCols=3;
    if(book.currentRequest && !book.currentRequest.pending && book.currentRequest.approved){
      this.bookNavbarCols=4;
    }
    return;
  }
  goToMyBooks(){
    this.store.dispatch(new fromStore.ChooseMyBooksMain());
  }
  ngOnInit() {
    this.myRequestsSubscription=this.store.select(fromStore.getUserRequests).subscribe((state)=>{this.myRequests=state;})
    this.bookNavBarEnabled=false;
    this.onResize();
  }
  ngOnDestroy(){
    this.myRequestsSubscription.unsubscribe();
  }

}
