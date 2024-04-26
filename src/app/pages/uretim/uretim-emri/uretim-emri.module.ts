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

@NgModule({
  declarations: [
    UretimEmriComponent,
    CreateUretimEmriComponent,
    DetailUretimEmriComponent,
    UpdateUretimEmriComponent,
    TabItemComponent, TabMainComponent,
    DeleteButtonComponent
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
    RouterModule.forChild([
      {
        path: 'create-uretim-emri', component: CreateUretimEmriComponent
      },   
      {
        path: 'update-uretim-emri', component: UpdateUretimEmriComponent
      },
      {
        path: 'detail-uretim-emri', component: DetailUretimEmriComponent
      },
      {
        path: "uretim-emri", component: UretimEmriComponent
      }
    ])
  ],
providers:[MatDatepickerModule]
})
export class UretimEmriModule { }
