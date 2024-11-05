import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HizmetComponent } from './hizmet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';

import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DetailHizmetComponent } from './detail-hizmet/detail-hizmet.component';
import { CreateHizmetComponent } from './create-hizmet/create-hizmet.component';
import { UpdateHizmetComponent } from './update-hizmet/update-hizmet.component';
import { ListHizmetComponent } from './list-hizmet/list-hizmet.component';
import { DesignComponent } from './core/design/design.component';
import { AngularSplitModule } from 'angular-split';
import { HizmetFormLabelComponent } from './core/components/hizmet-form-label';
import { HizmetFormDateComponent } from './core/components/hizmet-form-date';
import { HizmetFormInputSelectComponent } from './core/components/hizmet-form-input-select';
import { HizmetFormDropDownComponent } from './core/components/hizmet-form-dropdown';



@NgModule({
  declarations: [
    HizmetComponent,
    DetailHizmetComponent,
    CreateHizmetComponent,
    UpdateHizmetComponent,
    ListHizmetComponent,
    DesignComponent,
    HizmetFormLabelComponent,
    HizmetFormDateComponent,
    HizmetFormInputSelectComponent,
    HizmetFormDropDownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    AngularSplitModule,
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
        path:"list",component:ListHizmetComponent,canActivate:[authGuard]
      }
    ])
  ]
})
export class HizmetModule { }
