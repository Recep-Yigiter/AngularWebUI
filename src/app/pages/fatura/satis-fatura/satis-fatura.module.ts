import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisFaturaComponent } from './satis-fatura.component';
import { CreateSatisFaturaComponent } from './create-satis-fatura/create-satis-fatura.component';
import { UpdateSatisFaturaComponent } from './update-satis-fatura/update-satis-fatura.component';
import { DetailSatisFaturaComponent } from './detail-satis-fatura/detail-satis-fatura.component';
import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';
import { StokSelectModalComponent } from './components/stok-select-modal/stok-select-modal.component';
import { DepoSelectModalComponent } from './components/depo-select-modal/depo-select-modal.component';
import { CariSelectModalComponent } from './components/cari-select-modal/cari-select-modal.component';

import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NumberInputDirective } from './core/directives/number-input.directive';
import { ListSatisFaturaComponent } from './list-satis-fatura/list-satis-fatura.component';


@NgModule({
  declarations: [
    SatisFaturaComponent,
    CreateSatisFaturaComponent,
    UpdateSatisFaturaComponent,
    DetailSatisFaturaComponent,
    TabItemComponent,
    TabMainComponent,
    StokSelectModalComponent,
    DepoSelectModalComponent,
    CariSelectModalComponent,
    NumberInputDirective,
    DeleteButtonComponent,
    ListSatisFaturaComponent
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
        path: "satis-faturasi", component: ListSatisFaturaComponent,
    
      },
      {
        path: "satis-faturasi", component: SatisFaturaComponent,
        children: [
          { path: "create", component: CreateSatisFaturaComponent },
          { path: "update", component: UpdateSatisFaturaComponent },
          { path: "detail", component: DetailSatisFaturaComponent },
        ]
      },

      //  {
      //    path: "satis-faturasi", component: SatisFaturaComponent
      //  },

    ])
  ]
})
export class SatisFaturaModule { }
