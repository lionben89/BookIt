import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../store";
import {
  UserSettingsState,
  UserUpdateType
} from "./../../../data_types/states.model";
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../settings/dialog-one-button/dialog-one-button.component";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  @ViewChild("content") content: any;
  @Input() caller: string;

  public which_page = "my_books"; /* options = {my_books, add_book, my_books_chat} */
  public name;
  public msgVal: string = "";
  public userSettings: UserSettingsState;
  private items = new Array<Message>();
  public firstUser = "Stav";
  
  constructor(
    private store: Store<fromStore.MainState>,
    public dialog: MatDialog
  ) {
    //TODO get messages from DB
    this.foo();
  }

  ngOnInit() {
    this.store
      .select<any>(fromStore.getContextmybooksOption)
      .subscribe(state => {
        this.which_page = state;
      });

    //TODO get name from DB
  }

  foo() {
    this.msgVal = "Hello Michael!";
    this.name = "Stav";
    this.chatSend();

    this.msgVal = "Hey! Whats your name??";
    this.name = "Michael";
    this.chatSend();

  }

  goToMyBooks() {
    if(this.caller==="my_books")
      this.store.dispatch(new fromStore.ChooseMyBooksMain());
    else
    this.store.dispatch(new fromStore.ChooseMyRequests());
  }

  chatSend() {
    if (this.msgVal.length) {
      console.log("message = " + this.msgVal);
      console.log("userName = " + this.name);

      var newMsg: any = new Message(this.msgVal, this.name);

      this.items.push(newMsg);
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

export class Message {
  public message: string;
  public name: string;

  constructor(_message, _name) {
    this.message = _message;
    this.name = _name;
  }
}
