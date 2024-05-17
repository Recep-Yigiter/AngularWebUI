import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlisFaturaComponent } from './alis-fatura.component';
import { CreateAlisFaturaComponent } from './create-alis-fatura/create-alis-fatura.component';
import { UpdateAlisFaturaComponent } from './update-alis-fatura/update-alis-fatura.component';
import { DetailAlisFaturaComponent } from './detail-alis-fatura/detail-alis-fatura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';
import { StokSelectModalComponent } from './components/stok-select-modal/stok-select-modal.component';
import { DepoSelectModalComponent } from './components/depo-select-modal/depo-select-modal.component';
import { CariSelectModalComponent } from './components/cari-select-modal/cari-select-modal.component';

import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { NumberInputDirective } from './core/directives/number-input.directive';
import { ListAlisFaturaComponent } from './list-alis-fatura/list-alis-fatura.component';



@NgModule({
  declarations: [
    AlisFaturaComponent,
    CreateAlisFaturaComponent,
    UpdateAlisFaturaComponent,
    DetailAlisFaturaComponent,
    TabItemComponent,
    TabMainComponent,
    StokSelectModalComponent,
    DepoSelectModalComponent,
    CariSelectModalComponent,
    DeleteButtonComponent,
    NumberInputDirective,
    ListAlisFaturaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "alis-faturasi", component: ListAlisFaturaComponent,
       
      },
      {
        path: "alis-faturasi", component: AlisFaturaComponent,
        children: [
          { path: "create", component: CreateAlisFaturaComponent },
          { path: "update", component: UpdateAlisFaturaComponent },
          { path: "detail", component: DetailAlisFaturaComponent },
        ]
      }

    ])
  ]
})
export class AlisFaturaModule { }
