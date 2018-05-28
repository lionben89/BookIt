import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-sub-main',
  templateUrl: './sub-main.component.html',
  styleUrls: ['./sub-main.component.scss']
})
export class SubMainComponent implements OnInit {
  public _optionEnabled$: Observable<string>;
  test = true;
  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadLocations());
    this._optionEnabled$ = this.store.select(fromStore.getContextNavbarOptionEnabled);
  }

}
