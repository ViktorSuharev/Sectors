import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolboxSector } from '../sector-toolbox/sector-toolbox.component';

@Component({
  selector: 'app-edit-sector-dialog',
  templateUrl: './edit-sector-dialog.component.html'
})
export class EditSectorDialogComponent {
  constructor(private dialogRef: MatDialogRef<EditSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: ToolboxSector) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
