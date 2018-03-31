import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {CoursesComponent} from './courses.component';
import { BookComponent } from './book/book.component';
import { CoursesService } from './courses.service';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
