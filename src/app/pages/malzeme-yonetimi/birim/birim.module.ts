import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirimComponent } from './birim.component';
import { CreateBirimComponent } from './create-birim/create-birim.component';
import { UpdateBirimComponent } from './update-birim/update-birim.component';
import { DetailBirimComponent } from './detail-birim/detail-birim.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { ListBirimComponent } from './list-birim/list-birim.component';



@NgModule({
  declarations: [
    BirimComponent,
    CreateBirimComponent,
    UpdateBirimComponent,
    DetailBirimComponent,
    ListBirimComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'create', component: CreateBirimComponent,canActivate:[authGuard]
      },
      {
        path: 'detail', component: DetailBirimComponent,canActivate:[authGuard]
      },
      {
        path: 'update', component: UpdateBirimComponent,canActivate:[authGuard]
      },
      {
        path:"list",component:ListBirimComponent,canActivate:[authGuard]
      }
    ])
  ]
  
})
export class BirimModule { }
