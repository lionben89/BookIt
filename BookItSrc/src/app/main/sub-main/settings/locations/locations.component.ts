import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';
import { MatIconRegistry } from '@angular/material/icon';
import { IconsService } from './../../../../icons.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  providers: [IconsService]
})
export class LocationsComponent implements OnInit {
  public which_page = 'locations'; /* options = {settings, categories, locations} */
  public settingsOption$: Observable<string>;

  userLocations = [
    { name: 'My Currect Location', city: 'Tel Aviv', street: 'Namir', enabled: 'false' },
    { name: 'Home', city: 'Tel Aviv', street: 'Haim Levanon', enabled: 'false' },
    { name: 'Work', city: 'Givaataim', street: 'Katznelson', enabled: 'false' }];

  goToSettings(){
    this.store.dispatch(new fromStore.ChooseSettings);
  }

  constructor(private store: Store<fromStore.MainState>, iconService: IconsService) { }

  setOption(name){
    for (var _i = 0; _i < this.userLocations.length; _i++) {
      if(this.userLocations[_i].name === name){
        this.userLocations[_i].enabled = 'true';
        console.log('called on ' + name + ", which index? - " + _i);
      }
      else{
        this.userLocations[_i].enabled = 'false';
      }
    }
    
  }


  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
   this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state=>{ this.which_page=state;})
  } 

}
