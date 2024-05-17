import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepoComponent } from './depo.component';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CreateDepoComponent } from './create-depo/create-depo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailDepoComponent } from './detail-depo/detail-depo.component';
import { UpdateDepoComponent } from './update-depo/update-depo.component';
import { DetailDepoHareketlerComponent } from './detail-depo-hareketler/detail-depo-hareketler.component';



@NgModule({
  declarations: [DepoComponent, CreateDepoComponent, DetailDepoComponent, UpdateDepoComponent, DetailDepoHareketlerComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'create', component: CreateDepoComponent
      },
      {
        path: 'detail', component: DetailDepoComponent
      },
      {
        path: 'detail-depo-hareketler', component: DetailDepoHareketlerComponent
      },
      {
        path: 'update', component: UpdateDepoComponent
      },
      {
        path:"depo",component:DepoComponent
      }
    ])
  ]
})
export class DepoModule { }
