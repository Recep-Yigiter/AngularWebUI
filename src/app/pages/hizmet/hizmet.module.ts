import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HizmetComponent } from './hizmet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';

import { authGuard } from 'src/app/Auth/guard/auth.guard';
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
        path: 'create', component: CreateHizmetComponent,canActivate:[authGuard]
      },
      {
        path: 'detail', component: DetailHizmetComponent,canActivate:[authGuard]
      },
      {
        path: 'update', component: UpdateHizmetComponent,canActivate:[authGuard]
      },
      {
        path:"hizmet",component:HizmetComponent,canActivate:[authGuard]
      }
    ])
  ]
})
export class HizmetModule { }
