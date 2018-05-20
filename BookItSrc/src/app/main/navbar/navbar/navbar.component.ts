import { getContextNavbar } from './../../../store/reducers/context.reducer';
import { NavbarState } from './../../../data_types/states.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MatIconRegistry } from '@angular/material/icon';
import { IconsService } from './../../../icons.service';

import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [IconsService]

})
export class NavbarComponent implements OnInit,OnDestroy {
  public navbar: NavbarState;
  public navbarSubscription;

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
    this.navbarSubscription = this.store.select<any>(fromStore.getContextNavbar).subscribe(state=>this.navbar=state);
  }
  ngOnDestroy(){
    this.navbarSubscription.unsubscribe();
  }

}

