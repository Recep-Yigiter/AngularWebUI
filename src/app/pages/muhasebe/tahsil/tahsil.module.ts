import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TahsilComponent } from './tahsil.component';
import { CreateTahsilComponent } from './create-tahsil/create-tahsil.component';
import { UpdateTahsilComponent } from './update-tahsil/update-tahsil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { TahsilDesignComponent } from './core/tahsil-design/tahsil-design.component';
import { TahsilFormLabelComponent } from './core/components/tahsil-form-label';
import { TahsilFormDateComponent } from './core/components/tahsil-form-date';
import { TahsilFormInputSelectComponent } from './core/components/tahsil-form-input-select';
import { TahsilFormDropDownComponent } from './core/components/tahsil-form-dropdown';



@NgModule({
  declarations: [
    TahsilComponent,
    CreateTahsilComponent,
    UpdateTahsilComponent,
    TahsilDesignComponent,
    TahsilFormLabelComponent,
    TahsilFormDateComponent,
    TahsilFormInputSelectComponent,
    TahsilFormDropDownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
})
export class TahsilModule { }
