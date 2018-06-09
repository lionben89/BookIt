import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { UserSettingsState, UserUpdateType } from './../../../../data_types/states.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public which_page = 'my_books'; /* options = {my_books, add_book, my_books_chat} */
  public name;
  public msgVal: string = '';
  public userSettings:UserSettingsState;
  private items = new Array<Message>();
  public firstUser = "Teddy";

  constructor(private store: Store<fromStore.MainState>, public snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.store.select<any>(fromStore.getContextmybooksOption).subscribe(state => { this.which_page = state; });

    //TODO get name from DB

    //TODO get messages from DB
    this.foo();
  }

  foo(){
    this.msgVal = "test 1 test 1 test 1";
    this.name = "Teddy";
    this.chatSend();

    this.msgVal = "test 22 test 22s";
    this.name = "Bear";
    this.chatSend();

    /*this.msgVal = "test 333 test 333 test 333 test 333 test 333 test 333 test 333 test 333 test 333 test 333 test 333 test 333";
    this.name = "Teddy";
    this.chatSend();

    this.msgVal = "test 4444 test 4444 test 4444 test 4444 test 4444 test 4444 test 4444 test 4444 test 4444 test 4444";
    this.name = "Bear";
    this.chatSend();*/
  }

  goToMyBooks(){
    this.store.dispatch(new fromStore.ChooseMyBooksMain);
  }

  chatSend() {
    console.log("message = " + this.msgVal);
    console.log("userName = " + this.name);

    var newMsg : any = new Message(this.msgVal, this.name);

    this.items.push(newMsg);
    this.emptyChatText();

    this.snackBar.open("Message sent",null,{duration: 1000});
  }

  emptyChatText(){
    this.msgVal = '';
  }

}

export class Message{
  public message : string;
  public name : string;

  constructor(_message, _name){
    this.message = _message;
    this.name = _name;
  }
}
