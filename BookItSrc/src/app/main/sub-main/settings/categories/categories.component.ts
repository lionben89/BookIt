import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public which_page = 'categories'; /* options = {settings, categories, locations} */
  public settingsOption$: Observable<string>;

  /* mat chips */
  availableColors = [
    { name: 'Love', color: 'red' },
    { name: 'Food', color: 'blue' },
    { name: 'Hate', color: 'green' },
    { name: 'Arts', color: 'blue' },
    { name: 'Music', color: 'green' },
    { name: 'Biographies', color: 'blue' },
    { name: 'Cooking', color: 'green' },
    { name: 'Computers & Tech', color: 'blue' },
    { name: 'Health & Fitness', color: 'green' },
    { name: 'History', color: 'blue' },
    { name: 'Business', color: 'green' },
    { name: 'Kids', color: 'blue' },
    { name: 'Comics', color: 'green' },
    { name: 'Hobbies & Crafts', color: 'blue' },
    { name: 'Edu & Reference', color: 'green' },
    { name: 'Home & Garden', color: 'blue' },
    { name: 'Horror', color: 'green' },
    { name: 'Entertainment', color: 'blue' },
    { name: 'Medical', color: 'green' },
    { name: 'Social Sciences', color: 'blue' },
    { name: 'Religion', color: 'blue' },
    { name: 'Self-Help', color: 'blue' },
    { name: 'Sports', color: 'blue' },
    { name: 'Teen', color: 'blue' },
    { name: 'Romance', color: 'blue' },
    { name: 'Mysteries', color: 'blue' },
    { name: 'Parenting', color: 'blue' },
    { name: 'Travel', color: 'blue' },
    { name: 'Sci-Fi & Fantasy', color: 'blue' },
    { name: 'True Crime', color: 'blue' },
    { name: 'Special Edition', color: 'blue' },
    { name: 'Westerns', color: 'blue' },
    { name: 'Gay & Lesbian', color: 'grey' },
    { name: 'Other', color: 'grey' }];

    goToSettings(){
      this.store.dispatch(new fromStore.ChooseSettings);
    }
  
    constructor(private store: Store<fromStore.MainState>) { }


  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
   this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state=>{ this.which_page=state;})
  } 

}
