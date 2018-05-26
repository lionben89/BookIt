import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadLocations());
  }

}
