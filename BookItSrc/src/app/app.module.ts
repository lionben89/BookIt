import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule, MatIconRegistry, MatInputModule,MatAutocomplete} from '@angular/material' ;
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteComponent } from './navbar/auto-complete/auto-complete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    AutoCompleteComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'BookIt')
  ],
  providers: [AngularFirestore,MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
