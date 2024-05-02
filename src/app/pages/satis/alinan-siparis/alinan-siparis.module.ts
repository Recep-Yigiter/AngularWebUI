import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlinanSiparisComponent } from './alinan-siparis.component';
import { CreateAlinanSiparisComponent } from './create-alinan-siparis/create-alinan-siparis.component';
import { UpdateAlinanSiparisComponent } from './update-alinan-siparis/update-alinan-siparis.component';
import { DetailAlinanSiparisComponent } from './detail-alinan-siparis/detail-alinan-siparis.component';
import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';
import { StokSelectModalComponent } from './components/stok-select-modal/stok-select-modal.component';
import { CariSelectModalComponent } from './components/cari-select-modal/cari-select-modal.component';
import { NumberInputDirective } from './core/directives/number-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AlinanSiparisComponent,
    CreateAlinanSiparisComponent,
    UpdateAlinanSiparisComponent,
    DetailAlinanSiparisComponent,
    TabItemComponent,
    TabMainComponent,
    StokSelectModalComponent,
    CariSelectModalComponent,
    NumberInputDirective
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
        path: "create-alinan-siparis", component: CreateAlinanSiparisComponent
      },
      {
        path: "update-alinan-siparis", component: UpdateAlinanSiparisComponent
      },
      {
        path: "detail-alinan-siparis", component: DetailAlinanSiparisComponent
      },
      {
        path: "alinan-siparis", component: AlinanSiparisComponent
      },

    ])
  ]
})
export class AlinanSiparisModule { }
