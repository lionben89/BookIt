import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public which_page = 'settings'; /* options = {settings, categories, locations} */
  public settingsOption$: Observable<string>;
  
  /* global */
  checked = false;

  indeterminate = false;
  align = 'start';
  disabled = false;

  /* search radius */
  max = 30;
  min = 0.5;
  step = 0.5;
  value = 3;
  thumbLabel = true;

  

  /* Slide */
  slide_color = 'blue';
  slide_checked = false;

  goToLocations(){
    this.store.dispatch(new fromStore.ChooseSettingsLocations);
  }

  goToCategories(){
    this.store.dispatch(new fromStore.ChooseSettingsCategories);
  }

  constructor(private store: Store<fromStore.MainState>, public auth: AuthService) { }

  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
   this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state=>{ this.which_page=state;})
  }  
}
