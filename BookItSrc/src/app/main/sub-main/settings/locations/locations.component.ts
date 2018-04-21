import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public which_page = 'locations'; /* options = {settings, categories, locations} */
  public settingsOption$: Observable<string>;


    goToSettings(){
      this.store.dispatch(new fromStore.ChooseSettings);
    }
  
    constructor(private store: Store<fromStore.MainState>) { }


  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
   this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state=>{ this.which_page=state;})
  } 

}
