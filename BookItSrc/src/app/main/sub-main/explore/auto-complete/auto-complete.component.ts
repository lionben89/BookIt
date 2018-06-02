import { Book } from './../../../../data_types/states.model';
import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  bookCtrl: FormControl;
  filteredBooks: Observable<any[]>;
  @Input() books:Book[] ;
  @Output() getBookSelected = new EventEmitter<Book>();

  constructor() {
    this.bookCtrl = new FormControl();
    //this.bookCtrl.disable();
    this.filteredBooks = this.bookCtrl.valueChanges
      .pipe(
        startWith(''),
        map(book => book ? this.filterStates(book) :[])
      );
  }

  select(book:Book){
    this.getBookSelected.emit(book);
  }

  filterStates(name: string) {
    return this.books.filter(book =>
      book.title.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


  ngOnInit() {
  }

}
