import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StokComponent } from './stok.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { CreateStokComponent } from './create-stok/create-stok.component';
import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyInputDirective } from 'src/app/core/directives/currency-input.directive';
import { DetailStokComponent } from './detail-stok/detail-stok.component';
import { UpdateStokComponent } from './update-stok/update-stok.component';
import { AppTableComponent } from './components/app-table/app-table.component';

import { InputTrComponent } from './components/input-tr/input-tr.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectTrComponent } from './components/select-tr/select-tr.component';
import { TitleInputTrComponent } from './components/title-input-tr/title-input-tr.component';

import { DetailStokActionsComponent } from './detail-stok-actions/detail-stok-actions.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    StokComponent,
    CreateStokComponent,
    TabItemComponent,
    TabMainComponent,
    CurrencyInputDirective,
    DetailStokComponent,
    UpdateStokComponent,
    AppTableComponent,
    InputTrComponent,
    SelectTrComponent,
    TitleInputTrComponent,
   
    DetailStokActionsComponent,

  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'create-stok', component: CreateStokComponent
      },
      {
        path: 'update-stok', component: UpdateStokComponent
      },
      {
        path: 'detail-stok', component: DetailStokComponent
      },
      {
        path: 'detail-stok-actions', component: DetailStokActionsComponent
      },
      {
        path: "stok", component: StokComponent
      },


    ])
  ],

})
export class StokModule { }