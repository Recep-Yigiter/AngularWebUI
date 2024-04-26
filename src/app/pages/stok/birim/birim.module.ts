import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirimComponent } from './birim.component';
import { CreateBirimComponent } from './create-birim/create-birim.component';
import { UpdateBirimComponent } from './update-birim/update-birim.component';
import { DetailBirimComponent } from './detail-birim/detail-birim.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BirimComponent,
    CreateBirimComponent,
    UpdateBirimComponent,
    DetailBirimComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'create-birim', component: CreateBirimComponent
      },
      {
        path: 'detail-birim', component: DetailBirimComponent
      },
      {
        path: 'update-birim', component: UpdateBirimComponent
      },
      {
        path:"birim",component:BirimComponent
      }
    ])
  ]
  
})
export class BirimModule { }
