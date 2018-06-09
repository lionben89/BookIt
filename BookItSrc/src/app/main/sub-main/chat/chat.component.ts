import { Component, OnInit, OnDestroy, Input, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";
import * as fromStore from "../../../store";
import {
  ExtendedUserInfo,
  UserUpdateType,
  Message,
  Book
} from "./../../../data_types/states.model";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../settings/dialog-one-button/dialog-one-button.component";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() bookChat: Book;
  @ViewChild("content") content: any;
  @Input() caller: string;

  public which_page = "my_books"; /* options = {my_books, add_book, my_books_chat} */
  public name;
  public msgVal: string = "";

  private selfUserInfo: ExtendedUserInfo;
  private selfUserId: string;

  private otherUserId: string;

  private items = new Array<Message>();

  private selfUserSubscribtion: any;
  private threadSubscribtion: any;
  
  constructor(
    private store: Store<fromStore.MainState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.bookChat);
    console.log(this.caller);
    this.store
      .select<any>(fromStore.getContextmybooksOption)
      .subscribe(state => {
        this.which_page = state;
      });

    this.selfUserSubscribtion = this.store.select<any>(fromStore.getUserSettings).subscribe(state => {
      if (state) {
        this.selfUserInfo = state.info;
        this.selfUserId = this.selfUserInfo.uid;
        console.log("self");
        console.log(this.selfUserId);
        if (this.bookChat.ownerUid == this.selfUserId) {
          this.otherUserId = this.bookChat.currentRequest.borrowerUid;
        } else {
          this.otherUserId = this.bookChat.ownerUid;
        }
      }
    });

    console.log("Initialize thread");
    this.store.dispatch(new fromStore.InitMessageThread(this.bookChat.currentRequest.requestId));

    console.log("subscribe to messages");
    this.threadSubscribtion = this.store
      .select<any>(fromStore.getThreadMessages(this.bookChat.currentRequest.requestId))
      .subscribe(threadMessages => {
          this.items = threadMessages;
          console.log(threadMessages);
          console.log(threadMessages.length);
        });
  }

  ngOnDestroy() {
    console.log("Leaving chat screen");
    this.selfUserSubscribtion.unsubscribe();
    this.threadSubscribtion.unsubscribe();
  }

  orderByDate(item) {
    return new Date(item.timeSent);
  }

  goToMyBooks() {
    if(this.caller==="my_books")
      this.store.dispatch(new fromStore.ChooseMyBooksMain());
    else
    this.store.dispatch(new fromStore.ChooseMyRequests());
  }

  chatSend() {
    if (this.msgVal.length) {
      let date = new Date();
      console.log("message = " + this.msgVal);

      console.log("AddMessage");
      let message : Message = {
        threadId: this.bookChat.currentRequest.requestId,
        from: this.selfUserId,
        to: this.otherUserId,
        timeSent: date.toLocaleString("en-US"),
        content: this.msgVal
      };
      this.store.dispatch(new fromStore.AddMessage(message));

      this.emptyChatText();

      //this.scrollToBottom1();
    } else {
      this.openDialog_emptyLocation();
    }
  }

  openDialog_emptyLocation(): void {
    let dialogRef = this.dialog.open(DialogOneButtonComponent, {
      width: "250px",
      data: "Please write message first."
    });

    dialogRef.disableClose = true; //disable default close operation

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed"); //nothing else to do
    });
  }

  emptyChatText() {
    this.msgVal = "";
  }

  /*scrollToBottom1() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }*/
}
