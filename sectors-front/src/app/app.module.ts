import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectorPickerComponent } from './components/sector-picker/sector-picker.component';
import { SectorEditorComponent } from './components/sector-editor/sector-editor.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSectorDialogComponent } from './components/sector-tree-group/add-sector-dialog/add-sector-dialog.component';
import { EditSectorDialogComponent } from './components/sector-tree-group/edit-sector-dialog/edit-sector-dialog.component';
import { RemoveSectorDialogComponent } from './components/sector-tree-group/remove-sector-dialog/remove-sector-dialog.component';
import { SectorTreeComponent } from './components/sector-tree-group/sector-tree/sector-tree.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from './components/push-notification-group/notification-message/notification-message.component';

@NgModule({
  declarations: [
    AppComponent,
    SectorPickerComponent,
    SectorEditorComponent,
    AddSectorDialogComponent,
    EditSectorDialogComponent,
    RemoveSectorDialogComponent,
    SectorTreeComponent,
    NotificationMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
