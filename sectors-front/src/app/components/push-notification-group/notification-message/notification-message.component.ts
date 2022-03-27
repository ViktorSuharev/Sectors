import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.less']
})
export class NotificationMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) readonly message: string) { }
}
