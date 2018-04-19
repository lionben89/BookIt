import { StoreModule } from '@ngrx/store';
import {reducers} from '../store'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule} from '@angular/material' ;
import {MatIconRegistry} from '@angular/material';
import { IconsService } from '../icons.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';


@NgModule({
  imports: [
    CommonModule,MatIconRegistry,
    MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule,
    FormControl,Observable,
    StoreModule.forFeature('context',reducers)
  ],
  providers:[IconsService],
  declarations: [NavbarComponent, AutoCompleteComponent]
})
export class NavbarModule { }
