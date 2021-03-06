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

  constructor(private store: Store<fromStore.MainState>, iconService: IconsService, public snackBar: MatSnackBar, public dialog: MatDialog) { }
  public mybooksOption$: Observable<string>;
  userBooks: Book[];
  userBooksSubscription;
  numCols;
  bookNavBarEnabled: boolean;
  bookSelected: Book;
  public status: Loadable;
  public bookNavbarCols = 2;
  selfUserSubscribtion;
  selfUserId;
  otherUserId;
  waiting_approval_arr: Array<Book>;
  not_requested_arr: Array<Book>;
  new_msg_arr: Array<Book>;
  approved_arr: Array<Book>;
  waiting_reject_confirm_arr: Array<Book>;
  
  goToAddbook() {
    this.store.dispatch(new fromStore.ChooseMyBooksAddBook);
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


  showBookNavbar(book: Book) {
    this.bookNavBarEnabled = true;
    this.bookSelected = book;
    this.bookNavbarCols = 2;
    if (book.currentRequest && book.currentRequest.pending && !book.currentRequest.approved) {
      this.bookNavbarCols = 4;
    }
    else if (book.currentRequest && !book.currentRequest.pending && book.currentRequest.approved) {
      this.bookNavbarCols = 4;
    }
    return;
  }
  hideBookNavbar(book: Book) {
    if (book == this.bookSelected) {
      this.bookNavBarEnabled = false;
      this.bookSelected = undefined;
    }
  }
  removeBook() {
    if (this.bookSelected && this.bookSelected.currentRequest && this.bookSelected.currentRequest.approved) {
      let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
        width: "250px",
        data: ["Book request was already approved\n", "Are you sure you want to remove this book?"]
      });
      //check if user is sure he wish to remove this book
      dialogRef.afterClosed().subscribe(result => {
        if (result !== "cancel" && result !== "cancelAndDontShowAgain") {
          //this.userBooks.splice(this.userBooks.indexOf(this.bookSelected),1);
          this.store.dispatch(new fromStore.RemoveBook(this.bookSelected));
          this.bookNavBarEnabled = false;
          this.bookSelected = undefined;
        }
      });
    }
    else if (this.bookSelected && this.bookSelected.currentRequest && this.bookSelected.currentRequest.pending) {
      let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
        width: "250px",
        data: ["Book was requested \n", "Are you sure you want to remove this book?"]
      });
      //check if user is sure he wish to remove this book
      dialogRef.afterClosed().subscribe(result => {
        if (result !== "cancel" && result !== "cancelAndDontShowAgain") {
          //this.userBooks.splice(this.userBooks.indexOf(this.bookSelected),1);
          this.store.dispatch(new fromStore.RemoveBook(this.bookSelected));
          this.bookNavBarEnabled = false;
          this.bookSelected = undefined;
        }
      });
    }
    else {
      this.store.dispatch(new fromStore.RemoveBook(this.bookSelected));
      this.bookNavBarEnabled = false;
      this.bookSelected = undefined;
    }
  }
  approveRequest(book: Book) {
    let date = new Date();
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
      content: "Request was approved by book owner."
    };
    this.store.dispatch(new fromStore.AddMessage(
      {
        bookId: this.bookSelected.id,
        ownerUid: this.bookSelected.ownerUid,
        borrowerUid: this.bookSelected.currentRequest.borrowerUid,
        message: message,
      }
    ));
    book.currentRequest.pending = false;
    book.currentRequest.approved = true;
    book.lendCount = book.lendCount + 1;
    this.store.dispatch(new fromStore.UpdateBook(book));
    this.bookNavBarEnabled = false;

  }
  rejectRequest(book: Book) {
    if (this.bookSelected && this.bookSelected.currentRequest && this.bookSelected.currentRequest.approved) {
      let dialogRef = this.dialog.open(DialogTwoButtonComponent, {
        width: "250px",
        data: ["Was the book returned to you?, Are you sure you want to remove request?"]
      });
      //check if user is sure he wish to reject the book
      dialogRef.afterClosed().subscribe(result => {
        if (result !== "cancel") {
          book.currentRequest.pending = false;
          book.currentRequest.approved = false;
          book.currentRequest.waitingReject = false;
          this.store.dispatch(new fromStore.UpdateBook(book));
          this.hideBookNavbar(book);
        }
      });
    }
    else{
      book.currentRequest.pending = false;
      book.currentRequest.approved = false;
      book.currentRequest.waitingReject = false;
      this.store.dispatch(new fromStore.UpdateBook(book));
      this.hideBookNavbar(book);
    }
  }

  initArrayStatus(){ 
    this.waiting_approval_arr = new Array<Book>();
    this.new_msg_arr = new Array<Book>();
    this.approved_arr = new Array<Book>();
    this.not_requested_arr = new Array<Book>();
    this.waiting_reject_confirm_arr = new Array<Book>();

    for(var book of this.userBooks){
      if(book.currentRequest.waitingReject){ //status: waiting owner confirmation
        this.waiting_reject_confirm_arr.push(book);
      }
      else if(!book.currentRequest.pending && !book.currentRequest.approved){ //status: not requested yet
        this.not_requested_arr.push(book);
      }
      else if(book.currentRequest.pending && !book.currentRequest.approved){ //status: waitng approval
        this.waiting_approval_arr.push(book);
      }
      else if(book.currentRequest.hasNewMessages){ //status: new message
        this.new_msg_arr.push(book);
      }
      else{ //status: approved
        this.approved_arr.push(book);
      }
    }
  }

  startChat() {
    console.log('opening chat');
    this.store.dispatch(new fromStore.ChooseMyBooksChat);
    this.bookNavBarEnabled = false;
    //this.hideBookNavbar(this.bookSelected);

  }

  ngOnInit() {
    this.bookNavBarEnabled = false;
    this.onResize();
    this.whichPageSubscription = this.store.select<any>(fromStore.getContextmybooksOption).subscribe(state => { this.which_page = state; });

    this.userBooksSubscription = this.store.select<any>(fromStore.getUserBooks).subscribe(state => { this.userBooks = state; this.initArrayStatus(); });
    this.getUserDataStatusSubscription = this.store.select(fromStore.getUserDataStatus).subscribe(state => { this.status = state; });
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
  }

  ngOnDestroy() {
    this.whichPageSubscription.unsubscribe();
    this.userBooksSubscription.unsubscribe();
    this.getUserDataStatusSubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
    this.selfUserSubscribtion.unsubscribe();
    this.hideBookNavbar(this.bookSelected);
  }

}
