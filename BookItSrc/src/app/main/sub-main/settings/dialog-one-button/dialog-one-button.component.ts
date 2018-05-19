import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-one-button',
  templateUrl: './dialog-one-button.component.html',
  styleUrls: ['./dialog-one-button.component.scss']
})
export class DialogOneButtonComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<DialogOneButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickedConfirm(){
    console.log("called clickedConfirm!");
    this.dialogRef.close();
  }

}
