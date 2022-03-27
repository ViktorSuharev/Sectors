import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolboxSector } from '../sector-toolbox/sector-toolbox.component';

@Component({
  selector: 'app-add-sector-dialog',
  templateUrl: './add-sector-dialog.component.html'
})
export class AddSectorDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: ToolboxSector) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
