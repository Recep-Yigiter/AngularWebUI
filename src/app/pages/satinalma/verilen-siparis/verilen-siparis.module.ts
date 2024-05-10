import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerilenSiparisComponent } from './verilen-siparis.component';
import { CreateVerilenSiparisComponent } from './create-verilen-siparis/create-verilen-siparis.component';
import { UpdateVerilenSiparisComponent } from './update-verilen-siparis/update-verilen-siparis.component';
import { DetailVerilenSiparisComponent } from './detail-verilen-siparis/detail-verilen-siparis.component';
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
import { AlinanTeklifModalComponent } from './components/alinan-teklif-modal/alinan-teklif-modal.component';
import { AlinanTeklifHareketModalComponent } from './components/alinan-teklif-hareket-modal/alinan-teklif-hareket-modal.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    VerilenSiparisComponent,
    CreateVerilenSiparisComponent,
    UpdateVerilenSiparisComponent,
    DetailVerilenSiparisComponent,
    TabItemComponent,
    TabMainComponent,
    StokSelectModalComponent,
    CariSelectModalComponent,
    NumberInputDirective,
    AlinanTeklifModalComponent,
    AlinanTeklifHareketModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatBadgeModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "create-verilen-siparis", component: CreateVerilenSiparisComponent
      },
      {
        path: "update-verilen-siparis", component: UpdateVerilenSiparisComponent
      },
      {
        path: "detail-verilen-siparis", component: DetailVerilenSiparisComponent
      },
      {
        path: "verilen-siparis", component: VerilenSiparisComponent
      },

    ])
  ]
})
export class VerilenSiparisModule { }
