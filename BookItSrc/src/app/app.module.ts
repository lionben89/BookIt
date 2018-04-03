import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import {CoursesComponent} from './courses.component';
import { BookComponent } from './book/book.component';

import { CoursesService } from './courses.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'BookIt')
  ],
  providers: [CoursesService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
