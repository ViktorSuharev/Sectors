import { Component } from '@angular/core';
import { SectorsHttpService } from '../../services/sectors.http.service';
import {
  ToolboxSector,
  ToolboxSectorUpdateEvent,
  ToolboxSectorUpdateEventType, toSector,
  toToolboxSector
} from '../sector-toolbox-group/sector-toolbox/sector-toolbox.component';
import {PushNotificationService} from '../push-notification-group/services/push-notification.service';

@Component({
  selector: 'app-sector-editor',
  templateUrl: './sector-editor.component.html'
})
export class SectorEditorComponent {
  toolboxSectors: ToolboxSector[] = [];

  constructor(
    private readonly service: SectorsHttpService,
    private readonly notificationService: PushNotificationService) {
  }

  ngOnInit(): void {
    this.service.getSectors()
      .subscribe(sectors => this.toolboxSectors = sectors.map(s => toToolboxSector(s)));
  }

  onUpdated(event: ToolboxSectorUpdateEvent): void {
    console.debug('New update event: %o', event);
    switch(event.type) {
      case ToolboxSectorUpdateEventType.ADD: {
        if (event.newValue) {
          this.add(event.newValue);
        }
        break;
      }
      case ToolboxSectorUpdateEventType.EDIT: {
        if (event.oldValue && event.newValue) {
          this.edit(event.oldValue, event.newValue);
        }
        break;
      }
      case ToolboxSectorUpdateEventType.REMOVE: {
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

  private add(node: ToolboxSector): void {
    const sector = toSector(node);
    this.service.add(sector).subscribe(s => {
      console.debug('Sector was added: %o', s);
      this.notificationService.show('Sector was added');
    });
  }

  private edit(oldNode: ToolboxSector, newNode: ToolboxSector): void {
    const newSector = toSector(newNode);
    this.service.edit(newSector).subscribe(s => {
      console.debug('Sector %o was updated to %o', toSector(oldNode), s);
      this.notificationService.show('Sector was updated');
    });
  }

  private remove(node: ToolboxSector): void {
    const sector = toSector(node);

    this.service.remove(sector.id).subscribe(() => {
      console.debug('Sector was removed: %o', sector);
      this.notificationService.show('Sector was removed');
    });
  }
}
