import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sector } from '../../model/sector.model';
import { SectorsHttpService } from '../../services/sectors.http.service';
import { Involvement } from '../../model/involvement.model';
import { PushNotificationService } from '../push-notification-group/services/push-notification.service';
import {
  ToolboxSector,
  toSector,
  toToolboxSector
} from '../sector-toolbox-group/sector-toolbox/sector-toolbox.component';

@Component({
  selector: 'app-sector-picker',
  templateUrl: './sector-picker.component.html',
  styleUrls: ['./sector-picker.component.less']
})
export class SectorPickerComponent implements OnInit {
  toolboxSectors: ToolboxSector[] = [];
  selectedSectors: Sector[] = [];
  isSubmitted = false;

  sectorPickerForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    agreeToTerms: [false, Validators.requiredTrue],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: SectorsHttpService,
    private readonly notificationService: PushNotificationService) { }

  ngOnInit(): void {
    this.service.getSectors()
      .subscribe(sectors => this.toolboxSectors = sectors.map(s => toToolboxSector(s)));
    this.service.getSessionInvolvement()
      .subscribe(involvement => this.updateInvolvement(involvement));
  }

  saveForm(): void {
    this.sectorPickerForm.get('agreeToTerms')?.markAsDirty();
    this.isSubmitted = true;
    if (this.sectorPickerForm.valid && this.selectedSectors?.length !== 0) {
      const involvement: Involvement = {
        userName: this.sectorPickerForm.get('userName')?.value,
        sectors: this.selectedSectors,
        agreeToTerms: this.sectorPickerForm.get('agreeToTerms')?.value
      };

      this.service.createInvolvement(involvement)
        .subscribe(inv => {
          console.log('New involvement was saved', inv);
          this.notificationService.show('New involvement was saved');
        });
    }
  }

  onSelect(toolboxSectors: ToolboxSector[]): void {
    if (toolboxSectors) {
      this.selectedSectors = toolboxSectors.map(s => toSector(s));
    }
  }

  private updateInvolvement(involvement: Involvement): void {
    if (involvement) {
      this.sectorPickerForm = this.formBuilder.group({
        userName: [involvement.userName, Validators.required],
        sectors: [involvement.sectors, Validators.required],
        agreeToTerms: [involvement.agreeToTerms, Validators.requiredTrue],
      });
    }
  }
}
