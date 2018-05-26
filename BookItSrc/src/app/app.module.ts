import { ExploreEffects } from './store/effects/explore.effect';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar/navbar.component';
import { AutoCompleteComponent } from './main/navbar/auto-complete/auto-complete.component';
import { SubMainComponent } from './main/sub-main/sub-main.component';
import { SettingsComponent } from './main/sub-main/settings/settings.component';
import { ExploreComponent } from './main/sub-main/explore/explore.component';
import { MyBooksComponent } from './main/sub-main/my-books/my-books.component';
import { AddBookComponent } from './main/sub-main/my-books/add-book/add-book.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule, MatIconRegistry, MatInputModule,MatAutocomplete} from '@angular/material' ;
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule, MatChipsModule, MatSliderModule, MatSlideToggleModule, MatDialogModule } from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SliderModule } from 'primeng/slider';

//ngrx
import {StoreModule} from '@ngrx/store'; 
import { reducers } from './store/reducers';
import { CategoriesComponent } from './main/sub-main/settings/categories/categories.component';
import { LocationsComponent } from './main/sub-main/settings/locations/locations.component';
import { AddLocationComponent } from './main/sub-main/settings/locations/add-location/add-location.component';
import { CategoryComponent } from './main/sub-main/explore/category/category.component';
import { DialogOneButtonComponent } from './main/sub-main/settings/dialog-one-button/dialog-one-button.component';
import { DialogTwoButtonComponent } from './main/sub-main/settings/dialog-two-button/dialog-two-button.component';
import { DialogAddLocationTitleComponent } from './main/sub-main/settings/dialog-add-location-title/dialog-add-location-title.component';

//google map
import { AgmCoreModule } from '@agm/core';
import { EffectsModule } from '@ngrx/effects';
import { UserDataEffects } from './store/effects/userData.effect';


@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    AutoCompleteComponent,
    SubMainComponent,
    SettingsComponent,
    CategoriesComponent,
    LocationsComponent,
    AddLocationComponent,
    ExploreComponent,
    MyBooksComponent,
    AddBookComponent,
    DialogOneButtonComponent,
    DialogTwoButtonComponent,
    DialogAddLocationTitleComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    BrowserModule,
    SliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSliderModule,
    MatDialogModule,
    MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserDataEffects,ExploreEffects]),
    AngularFireModule.initializeApp(environment.firebase, 'BookIt'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3CvQbqcoQxsIoHTJMdBnFeBRu5XlZeP4',
      libraries: ['places']
    })
  ],
  entryComponents: [
    DialogOneButtonComponent,
    DialogTwoButtonComponent,
    DialogAddLocationTitleComponent,
  ],
  providers: [AngularFirestore, AngularFireDatabase, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
