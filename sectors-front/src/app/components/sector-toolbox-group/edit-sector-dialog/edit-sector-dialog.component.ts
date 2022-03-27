import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../sector-toolbox/sector-toolbox.component';

@Component({
  selector: 'app-edit-sector-dialog',
  templateUrl: './edit-sector-dialog.component.html'
})
export class EditSectorDialogComponent {
  constructor(public dialogRef: MatDialogRef<EditSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
