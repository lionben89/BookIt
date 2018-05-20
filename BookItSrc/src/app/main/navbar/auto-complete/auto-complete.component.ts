import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



export class Book {
  constructor(public name: string, public author: string, public pic: string) { }
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
      bookCtrl: FormControl;
    filteredBooks: Observable<any[]>;
  
    books: Book[] = [
      {
        name: 'Love',
        author: 'Dodi Levi',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
      },
      {
        name: 'Hate',
        author: 'Dodi Levi',
        // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
        pic: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
      },
      {
        name: 'Food',
        author: 'Haim Choen',
        // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
        pic: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
      },
    ];
  
    constructor() {
      this.bookCtrl = new FormControl();
      //this.bookCtrl.disable();
      this.filteredBooks = this.bookCtrl.valueChanges
        .pipe(
          startWith(''),
          map(book => book ? this.filterStates(book) : this.books.slice())
        );
    }
  
    filterStates(name: string) {
      return this.books.filter(book =>
        book.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
  

  ngOnInit() {
  }

}
