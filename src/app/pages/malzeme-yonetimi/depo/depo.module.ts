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
import { DesignComponent } from './core/design/design.component';

import { AngularSplitModule } from 'angular-split';
import { DepoFormLabelComponent } from './core/components/depo-form-label';
import { DepoFormDateComponent } from './core/components/depo-form-date';
import { DepoFormInputSelectComponent } from './core/components/depo-form-input-select';
import { DepoFormDropDownComponent } from './core/components/depo-form-dropdown';


@NgModule({
  declarations: [
    DepoComponent,
    CreateDepoComponent,
    DetailDepoComponent,
    UpdateDepoComponent,
    DetailDepoHareketlerComponent,
    ListDepoComponent,
    DesignComponent,
    DepoFormLabelComponent,
    DepoFormDateComponent,
    DepoFormInputSelectComponent,
    DepoFormDropDownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'create',
        component: CreateDepoComponent,
        canActivate: [authGuard],
      },
      {
        path: 'detail',
        component: DetailDepoComponent,
        canActivate: [authGuard],
      },
      {
        path: 'detail-depo-hareketler',
        component: DetailDepoHareketlerComponent,
        canActivate: [authGuard],
      },
      {
        path: 'update',
        component: UpdateDepoComponent,
        canActivate: [authGuard],
      },
      { path: 'list', component: ListDepoComponent, canActivate: [authGuard] },
    ]),
  ],
})
export class DepoModule {}
