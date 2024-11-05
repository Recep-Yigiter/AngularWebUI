import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrunAgaciComponent } from './urun-agaci.component';
import { CreateUrunAgaciComponent } from './create-urun-agaci/create-urun-agaci.component';
import { UpdateUrunAgaciComponent } from './update-urun-agaci/update-urun-agaci.component';
import { DetailUrunAgaciComponent } from './detail-urun-agaci/detail-urun-agaci.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { TabMainComponent } from './components/tab-main.component';
import { TabItemComponent } from './components/tab-item.component';
import { StokSelectModalComponent } from './components/stok-select-modal/stok-select-modal.component';
import { StokAddRowModalComponent } from './components/stok-add-row-modal/stok-add-row-modal.component';
import { UrunAgaciSelectModalComponent } from './components/urun-agaci-select-modal/urun-agaci-select-modal.component';


@NgModule({
  declarations: [
    UrunAgaciComponent,
    CreateUrunAgaciComponent,
    UpdateUrunAgaciComponent,
    DetailUrunAgaciComponent,
    TabItemComponent, TabMainComponent,
    StokSelectModalComponent,
    StokAddRowModalComponent,
    UrunAgaciSelectModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'create', component: CreateUrunAgaciComponent
      },   
      {
        path: 'update', component: UpdateUrunAgaciComponent
      },
      {
        path: 'detail', component: DetailUrunAgaciComponent
      },
      {
        path: "list", component: UrunAgaciComponent
      }
    ])
  ]
})
export class UrunAgaciModule { }
