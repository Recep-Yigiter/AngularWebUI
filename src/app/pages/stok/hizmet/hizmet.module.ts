import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HizmetComponent } from './hizmet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { DetailHizmetComponent } from './detail-hizmet/detail-hizmet.component';
import { CreateHizmetComponent } from './create-hizmet/create-hizmet.component';
import { UpdateHizmetComponent } from './update-hizmet/update-hizmet.component';



@NgModule({
  declarations: [
    HizmetComponent,
    DetailHizmetComponent,
    CreateHizmetComponent,
    UpdateHizmetComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'create-hizmet', component: CreateHizmetComponent
      },
      {
        path: 'detail-hizmet', component: DetailHizmetComponent
      },
      {
        path: 'update-hizmet', component: UpdateHizmetComponent
      },
      {
        path:"hizmet",component:HizmetComponent
      }
    ])
  ]
})
export class HizmetModule { }
