import { IconsService } from './../../icons.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [IconsService]

})
export class NavbarComponent implements OnInit {
  private _explorerEnabled: boolean=false;
  private _settingEnabled: boolean=false;
  private _myBooksEnabled: boolean=false;

  constructor(iconService: IconsService) {
    this._explorerEnabled=false;
    this._settingEnabled=false;
    this._explorerEnabled=true;
  }

  get explorerEnabled() {
    return this._explorerEnabled;
  }
  get settingEnabled() {
    return this._settingEnabled;
  }
  get myBooksEnabled() {
    return this._myBooksEnabled;
  }

  set explorerEnabled(enable:boolean){
    if (enable){
      this._explorerEnabled=enable;
      this._settingEnabled=!enable;
      this._myBooksEnabled=!enable;
    }
  }
  set settingEnabled(enable:boolean){
    if (enable){
      this._explorerEnabled=!enable;
      this._settingEnabled=enable;
      this._myBooksEnabled=!enable;
    }
  }
  set myBooksEnabled(enable:boolean){
    if (enable){
      this._explorerEnabled=!enable;
      this._settingEnabled=!enable;
      this._myBooksEnabled=enable;
    }
  }
  ngOnInit() {
   
  }

}

