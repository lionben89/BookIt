import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public _optionEnabled$ : Observable<string>;
  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this._optionEnabled$ = this.store.select(fromStore.getContextNavbarOptionEnabled);
  }

}
