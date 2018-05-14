import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(public title:string,public author: string,public category: string, public imagePath: string) { }
  ngOnInit() {
  }
  

}
