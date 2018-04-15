import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthGuard, NegativeAuthGuard } from './auth.guard';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, AuthGuard, NegativeAuthGuard]
})
export class CoreModule { }
