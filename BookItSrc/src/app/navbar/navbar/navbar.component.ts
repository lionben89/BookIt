import { Observable } from 'rxjs/Observable';
import { IconsService } from './../../icons.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [IconsService]

})
export class NavbarComponent implements OnInit {
  public _optionEnabled$: Observable<string>;


  constructor(private store: Store<fromStore.MainState>, iconService: IconsService) {
  }

  setSetting() {
    this.store.dispatch(new fromStore.ChooseSettings);
  }

  setExplorer() {
    this.store.dispatch(new fromStore.ChooseExplorer);
  }
  setMyBooks() {
    this.store.dispatch(new fromStore.ChooseMyBooks);
  }

  ngOnInit() {
    this._optionEnabled$ = this.store.select(fromStore.getContextNavbarOptionEnabled);
  };

}

