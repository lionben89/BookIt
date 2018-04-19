import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  val_radius : number = 50;
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  constructor() { }

  ngOnInit() {
  }
  
}
