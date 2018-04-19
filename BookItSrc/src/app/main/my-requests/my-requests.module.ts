import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRequestsComponent } from './my-requests.component';
import { RequestedBookComponent } from './requested-book/requested-book.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
  ],
  declarations: [MyRequestsComponent, RequestedBookComponent]
})
export class MyRequestsModule { }
