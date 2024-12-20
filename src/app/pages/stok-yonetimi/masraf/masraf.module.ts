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
import { ListMasrafComponent } from './list-masraf/list-masraf.component';
import { DesignComponent } from './core/design/design.component';

import { AngularSplitModule } from 'angular-split';
import { MasrafFormLabelComponent } from './core/components/masraf-form-label';
import { MasrafFormDateComponent } from './core/components/masraf-form-date';
import { MasrafFormInputSelectComponent } from './core/components/masraf-form-input-select';
import { MasrafFormDropDownComponent } from './core/components/masraf-form-dropdown';



@NgModule({
  declarations: [
    MasrafComponent,
    CreateMasrafComponent,
    UpdateMasrafComponent,
    DetailMasrafComponent,
    ListMasrafComponent,
    DesignComponent,
    MasrafFormLabelComponent,
    MasrafFormDateComponent,
    MasrafFormInputSelectComponent,
    MasrafFormDropDownComponent,
  ],
  imports: [
    CommonModule,
    AgGridAngular,
    AngularSplitModule,
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
        path:"list",component:ListMasrafComponent,canActivate:[authGuard]
      }
    ])
  ]
})
export class MasrafModule { }
