import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-location-title',
  templateUrl: './dialog-add-location-title.component.html',
  styleUrls: ['./dialog-add-location-title.component.scss']
})
export class DialogAddLocationTitleComponent implements OnInit {
  public def_val: string = "A location has no name";
  public name: string = "";
  public nameInputControl: FormControl = new FormControl();

  ngOnInit() {
      
    this.nameInputControl.valueChanges
        .subscribe(term => {
          this.name = term;
        });
    
  }

  constructor(
    public dialogRef: MatDialogRef<DialogAddLocationTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  addName(): void {
    if(this.name === ""){
      //send default value
      this.dialogRef.close(this.def_val);
    }
    else
      this.dialogRef.close(this.name);
  }
}
