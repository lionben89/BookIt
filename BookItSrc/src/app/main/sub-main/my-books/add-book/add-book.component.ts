import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormControl} from '@angular/forms';
import  'rxjs/Rx';//TODO import only debouncetime
import { HttpClient } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  searchField: FormControl;
  results: any[] = [];
  apiRoot: string = "https://www.googleapis.com/books/v1/volumes";
  searchTerm: string;
  constructor(private httpClient: HttpClient) { }
  doSearch() {
    if (this.searchTerm === "") {
      this.results = [];
      return;
    }

    //send book search request to Book API
    this.results = [];
    let url = `${this.apiRoot}/?q=` + this.searchTerm;
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
