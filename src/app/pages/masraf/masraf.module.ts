import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasrafComponent } from './masraf.component';
import { CreateMasrafComponent } from './create-masraf/create-masraf.component';
import { UpdateMasrafComponent } from './update-masraf/update-masraf.component';
import { DetailMasrafComponent } from './detail-masraf/detail-masraf.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';



@NgModule({
  declarations: [
    MasrafComponent,
    CreateMasrafComponent,
    UpdateMasrafComponent,
    DetailMasrafComponent
  ],
  imports: [
    CommonModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'create', component: CreateMasrafComponent,canActivate:[authGuard]
      },
      {
        path: 'detail', component: DetailMasrafComponent,canActivate:[authGuard]
      },
      {
        path: 'update', component: UpdateMasrafComponent,canActivate:[authGuard]
      },
      {
        path:"masraf",component:MasrafComponent,canActivate:[authGuard]
      }
    ])
  ]
})
export class MasrafModule { }
