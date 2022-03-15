import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sector } from '../../model/sector.model';
import { SectorsService } from '../../services/sectors.service';
import { Involvement } from '../../model/involvement.model';

@Component({
  selector: 'app-sector-picker',
  templateUrl: './sector-picker.component.html',
  styleUrls: ['./sector-picker.component.less']
})
export class SectorPickerComponent implements OnInit {
  sectors: Sector[] = [];
  selectedSectors: Sector[] = [];
  isSubmitted = false;

  sectorPickerForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    agreeToTerms: [false, Validators.requiredTrue],
  });

  constructor(private formBuilder: FormBuilder, private service: SectorsService) { }

  ngOnInit(): void {
    this.service.getSectors()
      .subscribe(sectors => this.sectors = sectors);
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
        .subscribe(inv => console.log('New involvement was saved', inv));
    }
  }

  onSelect(sectors: Sector[]): void {
    if (sectors) {
      this.selectedSectors = sectors;
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
