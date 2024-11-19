import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MahsupComponent } from './mahsup.component';
import { CreateMahsupComponent } from './create-mahsup/create-mahsup.component';
import { UpdateMahsupComponent } from './update-mahsup/update-mahsup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MahsupDesignComponent } from './core/mahsup-design/mahsup-design.component';
import { MahsupFormLabelComponent } from './core/components/mahsup-form-label';
import { MahsupFormDateComponent } from './core/components/mahsup-form-date';
import { MahsupFormInputSelectComponent } from './core/components/mahsup-form-input-select';
import { MahsupFormDropDownComponent } from './core/components/mahsup-form-dropdown';



@NgModule({
  declarations: [
    MahsupComponent,
    CreateMahsupComponent,
    UpdateMahsupComponent,
    MahsupDesignComponent,
    MahsupFormLabelComponent,
    MahsupFormDateComponent,
    MahsupFormInputSelectComponent,
    MahsupFormDropDownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
})
export class MahsupModule { }
