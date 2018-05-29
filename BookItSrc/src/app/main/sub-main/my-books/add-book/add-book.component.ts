import { Book } from './../../../navbar/auto-complete/auto-complete.component';
import { Component, OnInit,Input } from '@angular/core';
import {ReactiveFormsModule,FormControl} from '@angular/forms';
import  'rxjs/Rx';//TODO import only debouncetime
import { HttpClient } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { MatIconRegistry } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @Input() masterBooksArray : BookComponent[];
  searchField: FormControl;
  results: BookComponent[] = [];
  apiRoot: string = "https://www.googleapis.com/books/v1/volumes";
  searchTerm: string;
  public mybooksOption$: Observable<string>;
  constructor(private httpClient: HttpClient,private store: Store<fromStore.MainState>) { }
  addBook(_result : BookComponent){
    console.log('book added');
    //TODO need to add book to DB
    //TODO add dialog book added
    this.masterBooksArray.push(_result);//change to specific
    this.results = [];
    this.store.dispatch(new fromStore.ChooseMyBooksMain);
  }
  goToMyBooks(){
    this.store.dispatch(new fromStore.ChooseMyBooksMain);
  }
  doSearch() {
    if (this.searchTerm === "") {
      this.results = [];
      return;
    }
    
    let splited = this.searchTerm.split(" ");
    let final_search_term : string = "";

    for(let i = 0; i < splited.length; i++){
      if(splited[i] == "")
        return;

      if(i!= 0 && i != splited.length - 1){
        final_search_term = final_search_term.concat("+");
      }
      final_search_term = final_search_term.concat(splited[i]);
    }    

    //send book search request to Book API
    this.results = [];
    let url = `${this.apiRoot}/?q=` + final_search_term + '&filter=partial';
    console.log(url);

    let cnt = 0;

    this.httpClient.get(url).subscribe(res => {
      if (res['items'] === undefined){
        this.results = [];
        return;
      }
      for(let item of res['items']) {
        if (item.volumeInfo === undefined ||
            item.volumeInfo.categories === undefined ||
            item.volumeInfo.authors === undefined ||
            item.volumeInfo.imageLinks === undefined ||
            item.volumeInfo.imageLinks.thumbnail === undefined) {
          return;
        }
        let title = item.volumeInfo.title;
        let category = item.volumeInfo.categories;
        let author = item.volumeInfo.authors[0];
        let imagePath = item.volumeInfo.imageLinks.thumbnail;
        let book = new BookComponent(title, author,category, imagePath);
        this.results.push(book);

      }
    });
  }
   
  ngOnInit() {
    {
      this.searchField = new FormControl();
      this.searchField.valueChanges
          .debounceTime(400)
          .distinctUntilChanged()
          .subscribe(term => {
            this.searchTerm = term;
            this.doSearch();
          });
    }
  }

}
