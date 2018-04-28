import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../store';
import { Observable } from 'rxjs/Observable';
import { MatIconRegistry } from '@angular/material/icon';
import { IconsService } from './../../../../../icons.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  providers: [IconsService]
})
export class AddLocationComponent implements OnInit {
  lat: number = 32.1133141;
  lng: number = 34.80438770000001;

  public which_page = 'settings'; /* options = {settings, categories, locations, add_location} */
  public settingsOption$: Observable<string>;

  constructor(private store: Store<fromStore.MainState>, iconService: IconsService) { }

  goToLocations(){
    this.store.dispatch(new fromStore.ChooseSettingsLocations);
  }

  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
   this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state=>{ this.which_page=state;})
  }

}
