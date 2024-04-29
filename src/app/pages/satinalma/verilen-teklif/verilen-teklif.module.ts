import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerilenTeklifComponent } from './verilen-teklif.component';
import { CreateVerilenTeklifComponent } from './create-verilen-teklif/create-verilen-teklif.component';
import { UpdateVerilenTeklifComponent } from './update-verilen-teklif/update-verilen-teklif.component';
import { DetailVerilenTeklifComponent } from './detail-verilen-teklif/detail-verilen-teklif.component';
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
    VerilenTeklifComponent,
    CreateVerilenTeklifComponent,
    UpdateVerilenTeklifComponent,
    DetailVerilenTeklifComponent,
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
        path: "create-verilen-teklif", component: CreateVerilenTeklifComponent
      },
      {
        path: "update-verilen-teklif", component: UpdateVerilenTeklifComponent
      },
      {
        path: "detail-verilen-teklif", component: DetailVerilenTeklifComponent
      },
      {
        path: "verilen-teklif", component: VerilenTeklifComponent
      },

    ])
  ]
})
export class VerilenTeklifModule { }
