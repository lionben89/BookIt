import { Observable } from 'rxjs/Observable';
import { MainState } from './../store/reducers/index';
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { ExtendedUserInfo } from '../data_types/states.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user$:Observable<ExtendedUserInfo>
  constructor(/*public auth: AuthService*/ private store:Store<fromStore.MainState>) {}

  ngOnInit(){
    this.user$=this.store.select(fromStore.getUserDataInfo);
    this.store.dispatch(new fromStore.LoadUserInfo());
  }
  googleLogin(){
    this.store.dispatch(new fromStore.Login());
  }
  googleLogout(){
    this.store.dispatch(new fromStore.Logout());
  }
}
