import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectorNode } from '../sector-tree/sector-tree.component';

@Component({
  selector: 'app-add-sector-dialog',
  templateUrl: './add-sector-dialog.component.html'
})
export class AddSectorDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: SectorNode) { }
}
