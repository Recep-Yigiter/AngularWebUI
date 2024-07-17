import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepoComponent } from './depo.component';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CreateDepoComponent } from '../depo/create-depo/create-depo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailDepoComponent } from '../depo/detail-depo/detail-depo.component';
import { UpdateDepoComponent } from '../depo/update-depo/update-depo.component';
import { DetailDepoHareketlerComponent } from '../depo/detail-depo-hareketler/detail-depo-hareketler.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { ListDepoComponent } from './list-depo/list-depo.component';



@NgModule({
  declarations: [DepoComponent, CreateDepoComponent, DetailDepoComponent, UpdateDepoComponent, DetailDepoHareketlerComponent, ListDepoComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {  path: 'create', component: CreateDepoComponent,canActivate:[authGuard]},
      {  path: 'detail', component: DetailDepoComponent,canActivate:[authGuard]},
      {  path: 'detail-depo-hareketler', component: DetailDepoHareketlerComponent,canActivate:[authGuard]},
      {  path: 'update', component: UpdateDepoComponent,canActivate:[authGuard]},
      {  path:"list",component:ListDepoComponent,canActivate:[authGuard]}
    ])
  ]
})
export class DepoModule { }
