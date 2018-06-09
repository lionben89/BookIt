import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatToolbarModule} from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { IconsService } from '../../icons.service';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconRegistry,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    FormControl,
    Observable,
    StoreModule.forFeature('context', reducers),
  ],
  providers:[IconsService],
  declarations: [NavbarComponent]
})
export class NavbarModule { }
