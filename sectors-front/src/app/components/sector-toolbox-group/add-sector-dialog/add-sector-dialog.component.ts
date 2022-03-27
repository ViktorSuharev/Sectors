import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../sector-toolbox/sector-toolbox.component';

@Component({
  selector: 'app-add-sector-dialog',
  templateUrl: './add-sector-dialog.component.html'
})
export class AddSectorDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
