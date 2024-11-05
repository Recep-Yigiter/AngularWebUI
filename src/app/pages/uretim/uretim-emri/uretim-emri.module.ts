import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UretimEmriComponent } from './uretim-emri.component';
import { CreateUretimEmriComponent } from './create-uretim-emri/create-uretim-emri.component';
import { DetailUretimEmriComponent } from './detail-uretim-emri/detail-uretim-emri.component';
import { UpdateUretimEmriComponent } from './update-uretim-emri/update-uretim-emri.component';
import { TabMainComponent } from './components/tab-main.component';
import { TabItemComponent } from './components/tab-item.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ListUretimEmriComponent } from './list-uretim-emri/list-uretim-emri.component';
import { AngularSplitModule } from 'angular-split';
import { DesignComponent } from './core/design/design.component';
import { UretimEmriFormLabelComponent } from './core/components/uretim-emri-form-label';
import { UretimEmriFormDateComponent } from './core/components/uretim-emri-form-date';
import { UretimEmriFormInputSelectComponent } from './core/components/uretim-emri-form-input-select';
import { UretimEmriFormDropDownComponent } from './core/components/uretim-emri-form-dropdown';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  declarations: [
    UretimEmriComponent,
    CreateUretimEmriComponent,
    DetailUretimEmriComponent,
    UpdateUretimEmriComponent,
    TabItemComponent, TabMainComponent,
    DeleteButtonComponent,
    ListUretimEmriComponent,
    DesignComponent,
    UretimEmriFormLabelComponent,
    UretimEmriFormDateComponent,
    UretimEmriFormInputSelectComponent,
    UretimEmriFormDropDownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    AngularSplitModule,
    AccordionModule,
    ListboxModule,
    RouterModule.forChild([
      {
        path: 'create', component: CreateUretimEmriComponent
      },   
      {
        path: 'update', component: UpdateUretimEmriComponent
      },
      {
        path: 'detail', component: DetailUretimEmriComponent
      },
      {
        path: "list", component: ListUretimEmriComponent
      }
    ])
  ],
providers:[MatDatepickerModule]
})
export class UretimEmriModule { }
