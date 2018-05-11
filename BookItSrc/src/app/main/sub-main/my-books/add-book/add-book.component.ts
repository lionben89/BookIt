import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule,FormControl} from '@angular/forms';
import  'rxjs/Rx';//TODO import only debouncetime
import { HttpClient } from '@angular/common/http';
import { BookComponent } from './book/book.component';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  searchField: FormControl;
  searches: any[] = [];
  apiRoot: string = "https://www.googleapis.com/books/v1/volumes";
  isbn: string;
  constructor(private httpClient: HttpClient) { }
  doSearch(){
    //send book search request to Book API
  console.log("SEARCH");
  this.searches=[];
  let url = `${this.apiRoot}/?q=`+this.isbn;
  this.httpClient.get(url).subscribe(res => {for(let item of res.items){
    //console.log(item.volumeInfo.title);
    let title=item.volumeInfo.title;
    let category=item.volumeInfo.categories;
    let author=item.volumeInfo.authors[0];
    let imagePath=item.volumeInfo.imageLinks.thumbnail;
    let book = new BookComponent(title, author,category, imagePath);
    this.searches.push(book)
  }});
  };

  ngOnInit() {
    {
      this.searchField = new FormControl();
      this.searchField.valueChanges
          .debounceTime(400)
          .distinctUntilChanged()
          .subscribe(term => {
            //this.searches.push(term);
            this.isbn=term;
          });
    }
  }

}
