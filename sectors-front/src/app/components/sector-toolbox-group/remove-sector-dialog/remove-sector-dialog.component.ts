import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../sector-toolbox/sector-toolbox.component';

@Component({
  selector: 'app-remove-sector-dialog',
  templateUrl: './remove-sector-dialog.component.html'
})
export class RemoveSectorDialogComponent {
  constructor(public readonly dialogRef: MatDialogRef<RemoveSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
