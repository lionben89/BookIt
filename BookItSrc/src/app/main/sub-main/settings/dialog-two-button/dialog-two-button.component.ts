import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-two-button',
  templateUrl: './dialog-two-button.component.html',
  styleUrls: ['./dialog-two-button.component.scss']
})
export class DialogTwoButtonComponent implements OnInit {
  checked_dontshow = false;

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<DialogTwoButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
    }

  onNoClick(): void {
    this.dialogRef.close("cancel"); //on this case assume user wish to cancel
  }

  clickedConfirm(){
    console.log("called clickedConfirm!");
    if(this.checked_dontshow){
      this.dialogRef.close("confirmAndDontShowAgain");
    }
    else{
      this.dialogRef.close("confirm");
    }
  }

  clickedCancel(){
    console.log("called clickedCancel!");

    if(this.checked_dontshow){
      this.dialogRef.close("cancelAndDontShowAgain");
    }
    else{
      this.dialogRef.close("cancel");
    }
  }
}
