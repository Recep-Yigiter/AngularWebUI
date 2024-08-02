import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerilenSiparisComponent } from './verilen-siparis.component';
import { CreateVerilenSiparisComponent } from './create-verilen-siparis/create-verilen-siparis.component';
import { UpdateVerilenSiparisComponent } from './update-verilen-siparis/update-verilen-siparis.component';
import { DetailVerilenSiparisComponent } from './detail-verilen-siparis/detail-verilen-siparis.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { ListVerilenSiparisComponent } from './list-verilen-siparis/list-verilen-siparis.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DesignComponent } from './core/design/design.component';

import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    VerilenSiparisComponent,
    CreateVerilenSiparisComponent,
    UpdateVerilenSiparisComponent,
    DetailVerilenSiparisComponent,
    ListVerilenSiparisComponent,
    DesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatCheckboxModule,
    MatBadgeModule,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: "list", component: ListVerilenSiparisComponent, canActivate: [authGuard] },
      { path: "create", component: CreateVerilenSiparisComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateVerilenSiparisComponent, canActivate: [authGuard] },
      { path: "detail", component: DetailVerilenSiparisComponent, canActivate: [authGuard] },


    ])
  ]
})
export class VerilenSiparisModule { }
