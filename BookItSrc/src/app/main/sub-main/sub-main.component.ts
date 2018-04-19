import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-sub-main',
  templateUrl: './sub-main.component.html',
  styleUrls: ['./sub-main.component.scss']
})
export class SubMainComponent {
  public _optionEnabled$ : Observable<string>;
  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this._optionEnabled$ = this.store.select(fromStore.getContextNavbarOptionEnabled);
  }

}