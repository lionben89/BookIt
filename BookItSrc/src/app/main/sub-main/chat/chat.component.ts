import { Component, OnInit, OnDestroy, Input, ViewChild ,ElementRef} from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";
import * as fromStore from "../../../store";
import {
  ExtendedUserInfo,
  UserUpdateType,
  Message,
  Book,
  UserSettingsState
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
  @ViewChild("spacer") spacer: ElementRef;
  @Input() caller: string;

  public which_page = "my_books"; /* options = {my_books, add_book, my_books_chat} */
  public name;
  public msgVal: string = "";

  private selfUserInfo: ExtendedUserInfo;
  private selfUserId: string;

  private otherUserId: string;
  private otherUserSettings: UserSettingsState;
  private otherUserSettingsSubscription;

  private items = new Array<Message>();

  private selfUserSubscribtion: any;
  private threadSubscribtion: any;
  
  constructor(
    private store: Store<fromStore.MainState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store
      .select<any>(fromStore.getContextmybooksOption)
      .subscribe(state => {
        this.which_page = state;
      });

    this.selfUserSubscribtion = this.store.select<any>(fromStore.getUserSettings).subscribe(state => {
      if (state) {
        this.selfUserInfo = state.info;
        this.selfUserId = this.selfUserInfo.uid;
        if (this.bookChat.ownerUid === this.selfUserId) {
          this.otherUserId = this.bookChat.currentRequest.borrowerUid;
        } else {
          this.otherUserId = this.bookChat.ownerUid;
        }
      }
      this.store.dispatch(new fromStore.LoadOtherUserInfo(this.otherUserId));
      
    });

    this.store.dispatch(new fromStore.InitMessageThread(this.bookChat.currentRequest.requestId));

    this.threadSubscribtion = this.store
      .select<any>(fromStore.getThreadMessages(this.bookChat.currentRequest.requestId))
      .subscribe(threadMessages => {
          this.items = threadMessages;
          this.scrollToSpacer();
        });
       
        setTimeout(() => {
          this.spacer.nativeElement.scrollIntoView({behavior: 'smooth'});
        },300);

      this.otherUserSettingsSubscription=
      this.store.select<any>(fromStore.getOtherUserInfo(this.otherUserId)).subscribe((state)=>{
        console.log(state);
      })
        
        
        
      
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.DeactivateMessageThread(
      {
        ownerUid: this.bookChat.ownerUid,
        borrowerUid: this.bookChat.currentRequest.borrowerUid,
        bookId: this.bookChat.id,
        threadId: this.bookChat.currentRequest.requestId
      }
    ));

    this.selfUserSubscribtion.unsubscribe();
    this.threadSubscribtion.unsubscribe();
    this.otherUserSettingsSubscription.unsubscribe();
  }

  scrollToSpacer(){
  setTimeout(() => {
    this.spacer.nativeElement.scrollIntoView({behavior: 'smooth'});
  },300);}

  orderByDate(item) {
    return new Date(item.timeSent);
  }

  goToMyBooks() {
    if(this.caller==="my_books")
      this.store.dispatch(new fromStore.ChooseMyBooksMain());
    else
    this.store.dispatch(new fromStore.ChooseMyRequests());
  }

  chatSend(spacer) {
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
      this.store.dispatch(new fromStore.AddMessage(
        {
          bookId: this.bookChat.id,
          ownerUid: this.bookChat.ownerUid,
          borrowerUid: this.bookChat.currentRequest.borrowerUid,
          message: message,
        }
      ));

      this.emptyChatText();
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
}
