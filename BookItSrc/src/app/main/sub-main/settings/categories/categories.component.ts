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
  color: string;
  public randNums = [0,0,0,0,0,0,0]; /* lucky number 7 */

  /* mat chips */
  bookCategories = [
    { name: 'Love', clicked: false, color: '' },
    { name: 'Food', clicked: false, color: '' },
    { name: 'Hate', clicked: false, color: '' },
    { name: 'Computers & Tech', clicked: false, color: '' },
    { name: 'History', clicked: false, color: '' },
    { name: 'Music', clicked: false, color: '' },
    { name: 'Biographies', clicked: false, color: '' },
    { name: 'Cooking', clicked: false, color: '' },
    { name: 'Health & Fitness', clicked: false, color: '' },
    { name: 'Arts', clicked: false, color: '' },
    { name: 'Business', clicked: false, color: '' },
    { name: 'Kids', clicked: false, color: '' },
    { name: 'Comics', clicked: false, color: '' },
    { name: 'Hobbies & Crafts', clicked: false, color: '' },
    { name: 'Edu & Reference', clicked: false, color: '' },
    { name: 'Home', clicked: false, color: '' },
    { name: 'Garden', clicked: false, color: '' },
    { name: 'Horror', clicked: false, color: '' },
    { name: 'Entertainment', clicked: false, color: '' },
    { name: 'Medical', clicked: false, color: '' },
    { name: 'Social Sciences', clicked: false, color: '' },
    { name: 'Religion', clicked: false, color: '' },
    { name: 'Teen', clicked: false, color: '' },
    { name: 'Self-Help', clicked: false, color: '' },
    { name: 'Sports', clicked: false, color: '' },
    { name: 'Romance', clicked: false, color: '' },
    { name: 'Mysteries', clicked: false, color: '' },
    { name: 'Parenting', clicked: false, color: '' },
    { name: 'Travel', clicked: false, color: '' },
    { name: 'Fantasy', clicked: false, color: '' },
    { name: 'True Crime', clicked: false, color: '' },
    { name: 'Special Edition', clicked: false, color: '' },
    { name: 'Westerns', clicked: false, color: '' },
    { name: 'Other', clicked: false, color: '' }];

    goToSettings(){
      this.store.dispatch(new fromStore.ChooseSettings);
    }

    chipedClicked(name){
      for (var _i = 0; _i < this.bookCategories.length; _i++) {
        if(this.bookCategories[_i].name === name)
        {
          this.bookCategories[_i].clicked = !this.bookCategories[_i].clicked;
          if(this.bookCategories[_i].clicked)
              this.bookCategories[_i].color = 'accent';
          else
            this.bookCategories[_i].color = '';
        }
      }
    }

    pickForUser(){
      var max = this.bookCategories.length - 1;
      var min = 0;

      for (var _i = 0; _i < this.bookCategories.length; _i++) {
          this.bookCategories[_i].clicked = false;
          this.bookCategories[_i].color = '';
      }
      for (var _i = 0; _i < 7;) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;;
        if(!this.bookCategories[rand].clicked){
          this.bookCategories[rand].clicked = true;
          this.bookCategories[rand].color = 'accent';
          _i++;
        }
      }
    }
  
    constructor(private store: Store<fromStore.MainState>) { }


  ngOnInit() {
    this.settingsOption$ = this.store.select(fromStore.getContextSettingsOption);
   this.store.select<any>(fromStore.getContextSettingsOption).subscribe(state=>{ this.which_page=state;})
  } 

}
