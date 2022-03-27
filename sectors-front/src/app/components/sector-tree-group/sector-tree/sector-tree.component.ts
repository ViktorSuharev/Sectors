import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Sector } from '../../../model/sector.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditSectorDialogComponent } from '../edit-sector-dialog/edit-sector-dialog.component';
import { AddSectorDialogComponent } from '../add-sector-dialog/add-sector-dialog.component';
import { RemoveSectorDialogComponent } from '../remove-sector-dialog/remove-sector-dialog.component';
import { filter } from 'rxjs';

export interface SectorNode extends Sector {
  checked: boolean,
  children: SectorNode[]
}

export interface SectorTreeUpdateEvent {
  type: SectorTreeUpdateEventType;
  oldValue?: SectorNode,
  newValue?: SectorNode
}

export enum SectorTreeUpdateEventType {
  ADD,
  EDIT,
  REMOVE
}

export function toSectorNode(s: Sector): SectorNode {
  return {
    id: s.id,
    name: s.name,
    children: s.children.map(c => toSectorNode(c)) ?? [],
    parentId: s.parentId,
    checked: false
  };
}

export function toSector(s: SectorNode): Sector {
  return {
    id: s.id,
    name: s.name,
    children: s.children?.map(c => toSector(c)) ?? [],
    parentId: s.parentId
  };
}

@Component({
  selector: 'app-sector-tree',
  templateUrl: './sector-tree.component.html',
  styleUrls: ['./sector-tree.component.less']
})
export class SectorTreeComponent {
  treeControl = new NestedTreeControl<SectorNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SectorNode>();
  hasChild = (_: number, node: Sector) => !!node.children && node.children.length > 0;

  private selectedNodes: SectorNode[] = [];

  @Input() readonlyMode: boolean = false;
  @Input() set nodes(nodes: SectorNode[]) {
    const topSector: SectorNode = {
      id: 0,
      name: 'Sectors',
      parentId: -1,
      children: nodes,
      checked: false
    };

    this.dataSource.data = [topSector];
  }
  @Output() readonly selected: EventEmitter<SectorNode[]> = new EventEmitter<SectorNode[]>();
  @Output() readonly updated: EventEmitter<SectorTreeUpdateEvent> = new EventEmitter<SectorTreeUpdateEvent>();

  constructor(private readonly dialog: MatDialog) { }

  select(sector: SectorNode): void {
    sector.checked = !sector.checked;
    if (sector.checked) {
      this.selectedNodes.push(sector);
    } else {
      const index = this.selectedNodes.indexOf(sector, 0);
      if (index > -1) {
        this.selectedNodes.splice(index, 1);
      }
    }
    this.selected.emit(this.selectedNodes);
  }

  add(parent: SectorNode): void {
    const node: SectorNode = {
      name: '',
      parentId: parent.id,
      children: [],
      checked: false
    };
    const dialogRef: MatDialogRef<AddSectorDialogComponent> =
      this.dialog.open(AddSectorDialogComponent, this.toDialogConfig(node));

    dialogRef.afterClosed()
      .pipe(filter(this.isDefined))
      .subscribe(added => this.update(SectorTreeUpdateEventType.ADD, undefined, added));
  }

  edit(oldValue: SectorNode): void {
    const newValue: SectorNode = {
      id: oldValue.id,
      name: oldValue.name,
      parentId: oldValue.parentId,
      children: oldValue.children,
      checked: oldValue.checked
    };

    const dialogRef: MatDialogRef<EditSectorDialogComponent> =
      this.dialog.open(EditSectorDialogComponent, this.toDialogConfig(newValue));

    dialogRef.afterClosed()
      .pipe(filter(this.isDefined))
      .subscribe(edited => this.update(SectorTreeUpdateEventType.EDIT, oldValue, edited));
  }

  remove(node: SectorNode): void {
    const dialogRef: MatDialogRef<RemoveSectorDialogComponent> =
      this.dialog.open(RemoveSectorDialogComponent, this.toDialogConfig(node));

    dialogRef.afterClosed()
      .pipe(filter(this.isDefined))
      .subscribe(() => this.update(SectorTreeUpdateEventType.REMOVE, node, undefined));
  }

  private update(type: SectorTreeUpdateEventType, oldValue?: SectorNode, newValue?: SectorNode): void {
    const event: SectorTreeUpdateEvent = {
      type,
      oldValue,
      newValue
    };
    this.updated.emit(event);
  }

  private isDefined = (node : SectorNode): boolean => node !== undefined;

  private toDialogConfig = (data: SectorNode): MatDialogConfig => ({
    data
  })
}
