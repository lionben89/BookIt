import { LoadUserInfo } from './../store/actions/userData.action';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private store: Store<fromStore.MainState>) {
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadUserInfo());
    
  }
}
