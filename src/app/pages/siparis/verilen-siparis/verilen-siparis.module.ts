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

import {MatBadgeModule} from '@angular/material/badge';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';


@NgModule({
  declarations: [
    VerilenSiparisComponent,
    CreateVerilenSiparisComponent,
    UpdateVerilenSiparisComponent,
    DetailVerilenSiparisComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatBadgeModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "create-verilen-siparis", component: CreateVerilenSiparisComponent
      },
      {
        path: "update-verilen-siparis", component: UpdateVerilenSiparisComponent
      },
      {
        path: "detail-verilen-siparis", component: DetailVerilenSiparisComponent
      },
      {
        path: "verilen-siparis", component: VerilenSiparisComponent
      },

    ])
  ]
})
export class VerilenSiparisModule { }
