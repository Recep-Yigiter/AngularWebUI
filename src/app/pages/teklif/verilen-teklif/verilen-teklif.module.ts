import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { VerilenTeklifComponent } from './verilen-teklif.component';
import { CreateVerilenTeklifComponent } from './create-verilen-teklif/create-verilen-teklif.component';
import { UpdateVerilenTeklifComponent } from './update-verilen-teklif/update-verilen-teklif.component';
import { DetailVerilenTeklifComponent } from './detail-verilen-teklif/detail-verilen-teklif.component';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';


@NgModule({
  declarations: [
    VerilenTeklifComponent,
    CreateVerilenTeklifComponent,
    UpdateVerilenTeklifComponent,
    DetailVerilenTeklifComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "create-verilen-teklif", component: CreateVerilenTeklifComponent
      },
      {
        path: "update-verilen-teklif", component: UpdateVerilenTeklifComponent
      },
      {
        path: "detail-verilen-teklif", component: DetailVerilenTeklifComponent
      },
      {
        path: "verilen-teklif", component: VerilenTeklifComponent
      },

    ])
  ],

})
export class VerilenTeklifModule { }
