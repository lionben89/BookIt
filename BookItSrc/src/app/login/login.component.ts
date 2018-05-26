import { LoginGoogle } from './../store/actions/userData.action';
import { UserDataState } from './../data_types/states.model';
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
  userData:UserDataState;
  constructor(/*public auth: AuthService*/ private store:Store<fromStore.MainState>) {}

  ngOnInit(){
    this.store.select<any>(fromStore.getUserData).subscribe(state => { this.userData = state; })
    this.store.dispatch(new fromStore.LoadUserInfo());
  }
  googleLogin(){
    this.store.dispatch(new fromStore.LoginGoogle());
  }
  facebookLogin(){
    this.store.dispatch(new fromStore.LoginFacebook());
  }
}
