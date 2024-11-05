import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FisComponent } from './fis.component';
import { CreateFisComponent } from './create-fis/create-fis.component';
import { ListFisComponent } from './list-fis/list-fis.component';
import { DesignComponent } from './core/design/design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { AngularSplitModule } from 'angular-split';
import { CreateFisFromFaturaComponent } from './create-fis-from-fatura/create-fis-from-fatura.component';
import { FisFormLabelComponent } from './core/components/fis-form-label';
import { FisFormDateComponent } from './core/components/fis-form-date';
import { FisFormInputSelectComponent } from './core/components/fis-form-input-select';
import { FisFormDropDownComponent } from './core/components/fis-form-dropdown';



@NgModule({
  declarations: [
    FisComponent,
    CreateFisComponent,
    ListFisComponent,
    DesignComponent,
    CreateFisFromFaturaComponent,
    FisFormLabelComponent,
    FisFormDateComponent,
    FisFormInputSelectComponent,
    FisFormDropDownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
})
export class FisModule { }
