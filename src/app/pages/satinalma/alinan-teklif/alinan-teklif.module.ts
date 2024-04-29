import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlinanTeklifComponent } from './alinan-teklif.component';
import { CreateAlinanTeklifComponent } from './create-alinan-teklif/create-alinan-teklif.component';
import { UpdateAlinanTeklifComponent } from './update-alinan-teklif/update-alinan-teklif.component';
import { DetailAlinanTeklifComponent } from './detail-alinan-teklif/detail-alinan-teklif.component';
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
    AlinanTeklifComponent,
    CreateAlinanTeklifComponent,
    UpdateAlinanTeklifComponent,
    DetailAlinanTeklifComponent,
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
        path: "create-alinan-teklif", component: CreateAlinanTeklifComponent
      },
      {
        path: "update-alinan-teklif", component: UpdateAlinanTeklifComponent
      },
      {
        path: "detail-alinan-teklif", component: DetailAlinanTeklifComponent
      },
      {
        path: "alinan-teklif", component: AlinanTeklifComponent
      },

    ])
  ]
})
export class AlinanTeklifModule { }
