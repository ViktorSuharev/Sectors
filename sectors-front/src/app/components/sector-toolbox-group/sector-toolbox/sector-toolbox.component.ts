import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Sector } from '../../../model/sector.model';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditSectorDialogComponent } from '../edit-sector-dialog/edit-sector-dialog.component';
import { AddSectorDialogComponent } from '../add-sector-dialog/add-sector-dialog.component';
import { RemoveSectorDialogComponent } from '../remove-sector-dialog/remove-sector-dialog.component';
import { filter } from 'rxjs';

export interface ToolboxSector extends Sector {
  checked: boolean,
  children: ToolboxSector[]
}

export interface ToolboxSectorUpdateEvent {
  type: ToolboxSectorUpdateEventType;
  oldValue?: ToolboxSector,
  newValue?: ToolboxSector
}

export enum ToolboxSectorUpdateEventType {
  ADD,
  EDIT,
  REMOVE
}

export function toToolboxSector(s: Sector): ToolboxSector {
  return {
    id: s.id,
    name: s.name,
    children: s.children.map(c => toToolboxSector(c)) ?? [],
    parentId: s.parentId,
    checked: false
  };
}

export function toSector(s: ToolboxSector): Sector {
  return {
    id: s.id,
    name: s.name,
    children: s.children?.map(c => toSector(c)) ?? [],
    parentId: s.parentId
  };
}

@Component({
  selector: 'app-sector-toolbox',
  templateUrl: './sector-toolbox.component.html',
  styleUrls: ['./sector-toolbox.component.less']
})
export class SectorToolboxComponent {
  treeControl = new NestedTreeControl<ToolboxSector>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ToolboxSector>();
  hasChild = (_: number, node: Sector) => !!node.children && node.children.length > 0;

  selectedSectors: ToolboxSector[] = [];
  sectorNameFormControl: FormControl = new FormControl();

  @Input() readonlyMode: boolean = false;
  @Input() set sectors(sectors: ToolboxSector[]) {
    const topSector: ToolboxSector = {
      id: 0,
      name: 'Sectors',
      parentId: -1,
      children: sectors,
      checked: false
    };

    this.dataSource.data = [topSector];
  }
  @Output() readonly selected: EventEmitter<ToolboxSector[]> = new EventEmitter<ToolboxSector[]>();
  @Output() readonly updated: EventEmitter<ToolboxSectorUpdateEvent> = new EventEmitter<ToolboxSectorUpdateEvent>();

  constructor(private readonly dialog: MatDialog) {
  }

  select(sector: ToolboxSector): void {
    sector.checked = !sector.checked;
    if (sector.checked) {
      this.selectedSectors.push(sector);
    } else {
      const index = this.selectedSectors.indexOf(sector, 0);
      if (index > -1) {
        this.selectedSectors.splice(index, 1);
      }
    }
    this.selected.emit(this.selectedSectors);
  }

  add(parent: ToolboxSector): void {
    const node: ToolboxSector = {
      name: '',
      parentId: parent.id,
      children: [],
      checked: false
    };
    const dialogRef: MatDialogRef<AddSectorDialogComponent> =
      this.dialog.open(AddSectorDialogComponent, this.toDialogConfig(node));

    dialogRef.afterClosed()
      .pipe(filter(added => added !== undefined))
      .subscribe(added => this.update(ToolboxSectorUpdateEventType.ADD, undefined, added));
  }

  edit(oldValue: ToolboxSector): void {
    const newValue: ToolboxSector = {
      id: oldValue.id,
      name: oldValue.name,
      parentId: oldValue.parentId,
      children: oldValue.children,
      checked: oldValue.checked
    };

    const dialogRef: MatDialogRef<EditSectorDialogComponent> =
      this.dialog.open(EditSectorDialogComponent, this.toDialogConfig(newValue));

    dialogRef.afterClosed()
      .pipe(filter(edited => edited !== undefined))
      .subscribe(edited => this.update(ToolboxSectorUpdateEventType.EDIT, oldValue, edited));
  }

  remove(node: ToolboxSector): void {
    const dialogRef: MatDialogRef<RemoveSectorDialogComponent> =
      this.dialog.open(RemoveSectorDialogComponent, this.toDialogConfig(node));

    dialogRef.afterClosed()
      .pipe(filter(this.isDefined))
      .subscribe(() => this.update(ToolboxSectorUpdateEventType.REMOVE, node, undefined));
  }

  private update(type: ToolboxSectorUpdateEventType, oldValue?: ToolboxSector, newValue?: ToolboxSector): void {
    const event: ToolboxSectorUpdateEvent = {
      type,
      oldValue,
      newValue
    };
    this.updated.emit(event);
  }

  private isDefined = (toolboxSector : ToolboxSector): boolean => toolboxSector !== undefined;

  private toDialogConfig(data: ToolboxSector): MatDialogConfig {
    return {
      data
    };
  }
}
