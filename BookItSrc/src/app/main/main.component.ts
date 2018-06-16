import { LoadUserInfo } from './../store/actions/userData.action';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

import { MessagingService } from "../messaging.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessagingService]
})
export class MainComponent implements OnInit {
  constructor(private store: Store<fromStore.MainState>, private msgService: MessagingService) {
  }
  message;

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadUserInfo());
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }
}
