import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Sector } from '../../model/sector.model';
import { FormControl } from '@angular/forms';
import { SectorsService } from '../../services/sectors.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSectorDialogComponent } from '../edit-sector-dialog/edit-sector-dialog.component';
import { AddSectorDialogComponent } from '../add-sector-dialog/add-sector-dialog.component';
import { RemoveSectorDialogComponent } from '../remove-sector-dialog/remove-sector-dialog.component';

interface SectorChecked extends Sector {
  checked: boolean,
  children: SectorChecked[]
}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-sector-toolbox',
  templateUrl: './sector-toolbox.component.html',
  styleUrls: ['./sector-toolbox.component.less']
})
export class SectorToolboxComponent implements OnInit {
  treeControl = new NestedTreeControl<SectorChecked>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SectorChecked>();
  hasChild = (_: number, node: Sector) => !!node.children && node.children.length > 0;

  selectedSectors: SectorChecked[] = [];
  sectorNameFormControl: FormControl = new FormControl();

  @Input() readonlyMode: boolean = false;
  @Output() selected: EventEmitter<Sector[]> = new EventEmitter<Sector[]>();

  constructor(private service: SectorsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reloadTree();
  }

  select(sector: SectorChecked): void {
    console.log('sector id', sector.id);
    sector.checked = !sector.checked;
    if (sector.checked) {
      this.selectedSectors.push(sector);
    } else {
      const index = this.selectedSectors.indexOf(sector, 0);
      if (index > -1) {
        this.selectedSectors.splice(index, 1);
      }
    }
    this.selected.emit(this.selectedSectors.map(s => SectorToolboxComponent.createSector(s)));
  }

  edit(sectorChecked: SectorChecked): void {
    const dialogRef = this.dialog.open(EditSectorDialogComponent, {
      width: '250px',
      data: {
        name: sectorChecked.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sector: Sector = {
          id: sectorChecked.id,
          name: result,
          parentId: sectorChecked.parentId,
          children: sectorChecked.children
        };
        this.service.edit(sector).subscribe(s => {
          console.log('Sector was edited ', s);
          this.reloadTree();
        });
      }
    });
  }

  add(sectorChecked: SectorChecked): void {
    const dialogRef = this.dialog.open(AddSectorDialogComponent, {
      width: '250px',
      data: {
        name: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sector: Sector = {
          name: result,
          parentId: sectorChecked.id,
          children: []
        };
        this.service.add(sector).subscribe(s => {
          console.log('Sector was added ', s);
          this.reloadTree();
        });
      }
    });
  }

  remove(sectorChecked: SectorChecked): void {
    const dialogRef = this.dialog.open(RemoveSectorDialogComponent, {
      width: '250px',
      data: {
        name: sectorChecked.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.remove(sectorChecked.id).subscribe(s => {
          console.log('Sector was removed ', s);
          this.reloadTree();
        });
      }
    });
  }

  private reloadTree(): void {
    this.service.getSectors()
      .subscribe(sectors => {
        const topSector: SectorChecked = {
          id: 0,
          name: 'Sectors',
          parentId: -1,
          children: sectors.map(s => SectorToolboxComponent.createSectorChecked(s)),
          checked: false
        };

        this.dataSource.data = [topSector];
      });
  }

  private static createSectorChecked(s: Sector): SectorChecked {
    return {
      id: s.id,
      name: s.name,
      children: s.children.map(c => SectorToolboxComponent.createSectorChecked(c)),
      parentId: s.parentId,
      checked: false
    };
  }

  private static createSector(s: SectorChecked): Sector {
    return {
      id: s.id,
      name: s.name,
      children: s.children.map(c => SectorToolboxComponent.createSector(c)),
      parentId: s.parentId
    };
  }
}
