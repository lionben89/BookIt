import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//our components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar/navbar.component';
import { AutoCompleteComponent } from './main/navbar/auto-complete/auto-complete.component';
import { SubMainComponent } from './main/sub-main/sub-main.component';
import { SettingsComponent } from './main/sub-main/settings/settings.component';
import { MyRequestsComponent } from './main/my-requests/my-requests.component';
//design Moudles
import { MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule, MatIconRegistry, MatInputModule,MatAutocomplete } from '@angular/material' ;
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
//ngrx
import {StoreModule} from '@ngrx/store'; 
import { reducers } from './store/reducers';




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
    MyRequestsComponent,
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
    MatIconModule,
    MatAutocompleteModule,
    MatDividerModule,
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
