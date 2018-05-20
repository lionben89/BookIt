import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthGuard, NegativeAuthGuard } from './auth.guard';
import { CategoriesService } from './categories.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, AuthGuard, NegativeAuthGuard,CategoriesService]
})
export class CoreModule { }
