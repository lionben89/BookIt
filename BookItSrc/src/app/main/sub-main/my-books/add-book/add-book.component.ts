import { Book, ExtendedUserInfo } from '../../../../data_types/states.model';
import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import 'rxjs/Rx';//TODO import only debouncetime
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @Input() masterBooksArray: Book[];
  searchField: FormControl;
  results: Book[];
  apiRoot: string = "https://www.googleapis.com/books/v1/volumes";
  searchTerm: string;
  userInfo:ExtendedUserInfo;
  userInfoSubscription;
  searched:boolean;
  public mybooksOption$: Observable<string>;
  numCols;
  messegeSubscription;
  public startIndex = 0;
  public numRuns = 0;
  public maxResults = 12;
  public cntBooksFound = 0;
  searching: boolean;
  constructor(private httpClient: HttpClient, private store: Store<fromStore.MainState>,public snackBar: MatSnackBar) { }
  onResize() {
    if (window.innerWidth <= 400){
      this.numCols=3;
    }
    else if (window.innerWidth > 400 &&  window.innerWidth<800){
      this.numCols=4;
    }
    else{
      this.numCols=6;
    }
  }

  addBook(result: Book) {
    console.log('book added');
    //TODO need to add book to DB
    //TODO add dialog book added
    this.masterBooksArray.push(result);//change to specific
    this.searched=false;
    this.results = [];
    this.store.dispatch(new fromStore.AddBook(result));
 
  }
  goToMyBooks() {
    this.store.dispatch(new fromStore.ChooseMyBooksMain);
  }
  doSearch() {
    if(this.searching)return;
    else this.searching=true;
    this.searched=false;
    if (this.searchTerm === "") {
      return;
    }
    

    //send book search request to Book API
    

    let url = this.apiRoot + '/?q=' + encodeURIComponent(this.searchTerm) + '&startIndex=' + this.startIndex + '&maxResults=' + this.maxResults + '&printType=books&fields=items(id%2CvolumeInfo(authors%2Ccategories%2Cdescription%2CimageLinks%2CmainCategory%2CratingsCount%2Ctitle))%2Ckind%2CtotalItems&key=AIzaSyCSIkOfp54J7oPZ-lrkxyswdpBxb8t3d0U';//&key=AIzaSyD3CvQbqcoQxsIoHTJMdBnFeBRu5XlZeP4
    this.startIndex += this.maxResults;

    this.httpClient.get(url).subscribe(res => {
      if (res['items'] === undefined) {
        this.searched=true;
        this.searching=false;
        return;
      }

      this.cntBooksFound = 0;
      for (let item of res['items']) {
        this.cntBooksFound++;

        if (item.volumeInfo === undefined ||
          item.volumeInfo.categories === undefined ||
          item.volumeInfo.authors === undefined ||
          item.volumeInfo.imageLinks === undefined ||
          item.volumeInfo.imageLinks.thumbnail === undefined ||
          item.id === undefined) {
          continue;
        }

        let _description = "Book has no description.";
        let _title = "Book has no title.";

        if(item.volumeInfo.description){
          _description = item.volumeInfo.description;
        }
        if(item.volumeInfo.title){
          _title = item.volumeInfo.title;
        }

        let book: Book = {
          id:item.id,
          visible:true,
          giveaway:false,
          lendCount:0,
          maxLendDays:30,
          ownerUid:this.userInfo.uid,
          title: _title,
          author:item.volumeInfo.authors[0],
          categories:item.volumeInfo.categories,
          imagePath:item.volumeInfo.imageLinks.smallThumbnail,//changed to smallThumbnail from thumbnail
          description: _description,
          currentRequest:{
            pending:false,
            approved:false,
            hasNewMessages: false,
          }
        };
        this.results.push(book);
      }
      this.searching=false;
      this.searched=true;
      
      if(!this.cntBooksFound){
        //did not find any books in last run -> return
        console.log("did not find any books in last run -> return, numRuns = " + this.numRuns++);
        this.searching=false;
        return;
      }
    });
  }
  onScroll(){	
       if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight-40) {
         console.log("near bottom! add more books");
         this.doSearch();
       } 
  }
  ngOnInit() {
      this.searching=false;
      this.results=[];
      this.searchTerm='';
      this.searched=false;
      this.onResize();
      this.searchField = new FormControl();
      this.searchField.valueChanges
        .debounceTime(1000)
        .distinctUntilChanged()
        .subscribe(term => {
          this.searchTerm = term;
          if(this.searchTerm===''){
            this.results = [];
            this.searched=false;
          }
          else {
            this.startIndex=0;
            this.results=[];
            this.doSearch();
          }
        });
        this.userInfoSubscription=this.store.select(fromStore.getUserInfo).subscribe((state)=>{this.userInfo=state;});
        this.messegeSubscription=this.store.select(fromStore.getMessege).subscribe((state)=>{
          if (state && state!=='') {
            this.snackBar.open(state, null, { duration: 3000 });
            setTimeout(this.store.dispatch(new fromStore.ShowMessege('')),0);
          }
        });

  }
  ngOnDestroy(){
    this.userInfoSubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
  }

}
