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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule, MatIconRegistry, MatInputModule,MatAutocomplete} from '@angular/material' ;
import { MatCheckboxModule, MatChipsModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
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
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    AngularFireModule.initializeApp(environment.firebase, 'BookIt')
  ],
  providers: [AngularFirestore,MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
