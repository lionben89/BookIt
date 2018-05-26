import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-location-title',
  templateUrl: './dialog-add-location-title.component.html',
  styleUrls: ['./dialog-add-location-title.component.scss']
})
export class DialogAddLocationTitleComponent implements OnInit {
  public added_name: string = " - "; //default value
  public name;
  public nameInputControl: FormControl = new FormControl();

  ngOnInit() {
    {
      
      this.nameInputControl.valueChanges
          .subscribe(term => {
            this.name = term;
          });
    }
  }

  constructor(
    public dialogRef: MatDialogRef<DialogAddLocationTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(this.added_name);
  }

  addName(): void {
    console.log("added_name = " + this.added_name);
    this.added_name = name;
    console.log("name = " + name);
    console.log("added_name = " + this.added_name);
    this.dialogRef.close(this.added_name);
  }
}
