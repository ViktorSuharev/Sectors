import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectorsHttpService } from '../../services/sectors.http.service';
import {
  SectorNode,
  SectorTreeUpdateEvent,
  SectorTreeUpdateEventType, toSector,
} from '../sector-tree-group/sector-tree/sector-tree.component';
import { PushNotificationService } from '../push-notification-group/services/push-notification.service';

@Component({
  selector: 'app-sector-editor',
  templateUrl: './sector-editor.component.html'
})
export class SectorEditorComponent {
  @Input() nodes: SectorNode[] = [];
  @Output() updated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly service: SectorsHttpService,
    private readonly notificationService: PushNotificationService) { }

  onUpdated(event: SectorTreeUpdateEvent): void {
    console.debug('New update event: %o', event);
    switch(event.type) {
      case SectorTreeUpdateEventType.ADD: {
        if (event.newValue) {
          this.add(event.newValue);
        }
        break;
      }
      case SectorTreeUpdateEventType.EDIT: {
        if (event.oldValue && event.newValue) {
          this.edit(event.oldValue, event.newValue);
        }
        break;
      }
      case SectorTreeUpdateEventType.REMOVE: {
        if (event.oldValue) {
          this.remove(event.oldValue);
        }
        break;
      }
      default: {
        console.warn(`Unsupported operation: ${event.type}`);
        break;
      }
    }
  }

  private add(node: SectorNode): void {
    const sector = toSector(node);

    this.service.add(sector).subscribe(s => {
      console.debug('Sector was added: %o', s);
      this.notificationService.show('Sector was added');
      this.updated.emit();
    });
  }

  private edit(oldNode: SectorNode, newNode: SectorNode): void {
    const newSector = toSector(newNode);

    this.service.edit(newSector).subscribe(s => {
      console.debug('Sector %o was updated to %o', toSector(oldNode), s);
      this.notificationService.show('Sector was updated');
      this.updated.emit();
    });
  }

  private remove(node: SectorNode): void {
    const sector = toSector(node);

    this.service.remove(sector.id).subscribe({
      next: () => {
        console.debug('Sector was removed: %o', sector);
        this.notificationService.show('Sector was removed');
        this.updated.emit();
      },
      error: () => {
        console.debug('Unable to remove sector: %o', sector);
        this.notificationService.show('Unable to remove sector');
      }
    });
  }
}
