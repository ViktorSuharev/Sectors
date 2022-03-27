import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectorNode } from '../sector-tree/sector-tree.component';

@Component({
  selector: 'app-remove-sector-dialog',
  templateUrl: './remove-sector-dialog.component.html'
})
export class RemoveSectorDialogComponent {
  constructor(private readonly dialogRef: MatDialogRef<RemoveSectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: SectorNode) { }
}
