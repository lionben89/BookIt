import { getUserDataStatus } from './../../../store/reducers/index';
import { Book, Loadable, Message } from './../../../data_types/states.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material';
import { IconsService } from '../../../icons.service';
import { DialogTwoButtonComponent } from "../settings/dialog-two-button/dialog-two-button.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  providers: [IconsService]
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
  selfUserSubscribtion;
  selfUserId;
  otherUserId;  
  waiting_approval: Array<Book> = new Array<Book>();
  approved_arr: Array<Book> = new Array<Book>();
  new_msg_arr: Array<Book> = new Array<Book>();

  constructor(private store: Store<fromStore.MainState>, iconService: IconsService, public snackBar: MatSnackBar,
    public dialog: MatDialog) { }


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

  startChat() {
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
    let date = new Date();
    if (this.bookSelected && this.bookSelected.currentRequest && this.bookSelected.currentRequest.approved) {
      let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
        width: "250px",
        data: "Request was already approved, Do you want to send cancel message to book owner?"
      });
      //check if user is sure he wish to remove this request
      dialogRef.afterClosed().subscribe(result => {
        if (result !== "cancel") {
          if (this.bookSelected && this.bookSelected.ownerUid === this.selfUserId) {
            this.otherUserId = this.bookSelected.currentRequest.borrowerUid;
          } else {
            this.otherUserId = this.bookSelected.ownerUid;
          }
          let message : Message = {
            threadId: this.bookSelected.currentRequest.requestId,
            from: this.selfUserId,
            to: this.otherUserId,
            timeSent: date.toLocaleString("en-US"),
            content: "Request was canceled by other user, reject request if book was returned."
          };
          this.store.dispatch(new fromStore.AddMessage({
            bookId: this.bookSelected.id,
            ownerUid: this.bookSelected.ownerUid,
            borrowerUid: this.bookSelected.currentRequest.borrowerUid,
            message: message,
          }));
        }
      });
    }
    else{
      this.updateArrayStatus(this.bookSelected);
      this.store.dispatch(new fromStore.RemoveRequestBook(this.bookSelected));
          this.hideBookNavbar(this.bookSelected);
    }
  }

  showBookNavbar(book: Book) {
    this.bookNavBarEnabled = true;
    this.bookSelected = book;
    this.bookNavbarCols = 2;
    if (book.currentRequest && !book.currentRequest.pending && book.currentRequest.approved) {
      this.bookNavbarCols = 3;
    }
    return;
  }

  initArrayStatus(){ 
    for(var book of this.myRequests){
      if(book.currentRequest.pending){ //status: waiting approval
        this.waiting_approval.push(book);
      }
      else if(book.currentRequest.approved && book.currentRequest.hasNewMessages){ //status: new message
        this.new_msg_arr.push(book);
      }
      else{ //status: approved
        this.approved_arr.push(book);
      }
    }
  }

  updateArrayStatus(book: Book){ //remove book from the relevant books list
    var i: number;

    for(i = 0 ; i < this.approved_arr.length; i++){
      if(this.approved_arr[i].id === book.id){
        this.approved_arr.splice(i, 1);
        return;
      }
    }

    for(i = 0 ; i < this.waiting_approval.length; i++){
      if(this.waiting_approval[i].id === book.id){
        this.waiting_approval.splice(i, 1);
        return;
      }
    }

    for(i = 0 ; i < this.new_msg_arr.length; i++){
      if(this.new_msg_arr[i].id === book.id){
        this.new_msg_arr.splice(i, 1);
        return;
      }
    }
  }

  ngOnInit() {
    this.myRequestsSubscription = this.store.select(fromStore.getUserRequests).subscribe((state) => { this.myRequests = state; })
    this.messegeSubscription = this.store.select(fromStore.getMessege).subscribe((state) => {
      if (state && state !== '') {
        this.snackBar.open(state, null, { duration: 3000 });
        setTimeout(this.store.dispatch(new fromStore.ShowMessege('')), 0);
      }
    });
    this.selfUserSubscribtion = this.store.select<any>(fromStore.getUserSettings).subscribe(state => {
      if (state) {
        this.selfUserId = state.info.uid;
        
      }
    });
    this.bookNavBarEnabled = false;
    this.whichPageSubscription = this.store.select<any>(fromStore.getContextmyRequestsOption).subscribe(state => { this.which_page = state; });
    this.onResize();

    //init the 3 arrs of requests status {new message, waiting approval, approved}
    this.initArrayStatus();

  }
  ngOnDestroy() {
    this.myRequestsSubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
    this.whichPageSubscription.unsubscribe();
    this.selfUserSubscribtion.unsubscribe();
    this.hideBookNavbar(this.bookSelected);
  }

}
