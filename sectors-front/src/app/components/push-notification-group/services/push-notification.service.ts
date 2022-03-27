import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInMs: number = 1000;

  constructor(private readonly snackBar: MatSnackBar) { }

  show(message: string) {
    this.snackBar.openFromComponent(NotificationMessageComponent, {
      data: message,
      duration: this.durationInMs,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
