import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrunReceteComponent } from './urun-recete.component';
import { CreateUrunReceteComponent } from './create-urun-recete/create-urun-recete.component';
import { DetailUrunReceteComponent } from './detail-urun-recete/detail-urun-recete.component';
import { UpdateUrunReceteComponent } from './update-urun-recete/update-urun-recete.component';
import { TabMainComponent } from './components/tab-main.component';
import { TabItemComponent } from './components/tab-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StokSelectModalComponent } from './components/stok-select-modal/stok-select-modal.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { OperasyonSelectModalComponent } from './components/operasyon-select-modal/operasyon-select-modal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    UrunReceteComponent,
    CreateUrunReceteComponent,
    DetailUrunReceteComponent,
    UpdateUrunReceteComponent,
    TabItemComponent, TabMainComponent,

    StokSelectModalComponent,
    DeleteButtonComponent,
    OperasyonSelectModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'create-urun-recete', component: CreateUrunReceteComponent
      },   
      {
        path: 'update-urun-recete', component: UpdateUrunReceteComponent
      },
      {
        path: 'detail-urun-recete', component: DetailUrunReceteComponent
      },
      {
        path: "urun-recete", component: UrunReceteComponent
      }
    ])
  ]
})
export class UrunReceteModule { }
