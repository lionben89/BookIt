import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import {CoursesComponent} from './courses.component';
import { BookComponent } from './book/book.component';

import { CoursesService } from './courses.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { SettingsComponent } from './main/settings/settings.component';

import { FormsModule, NgForm } from '@angular/forms';
import {SliderModule} from 'primeng/slider';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CoursesComponent,
    BookComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    SliderModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'BookIt')
  ],
  providers: [CoursesService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
