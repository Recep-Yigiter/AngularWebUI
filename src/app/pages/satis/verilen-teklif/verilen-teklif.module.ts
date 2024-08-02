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
import { ListVerilenTeklifComponent } from './list-verilen-teklif/list-verilen-teklif.component';
import { ButtonModule } from 'primeng/button';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DesignComponent } from './core/design/design.component';
import { AngularSplitModule } from 'angular-split';


@NgModule({
  declarations: [
    VerilenTeklifComponent,
    CreateVerilenTeklifComponent,
    UpdateVerilenTeklifComponent,
    DetailVerilenTeklifComponent,
    ListVerilenTeklifComponent,
    DesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ButtonModule,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: "list", component: ListVerilenTeklifComponent, canActivate: [authGuard] },
      { path: "create", component: CreateVerilenTeklifComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateVerilenTeklifComponent, canActivate: [authGuard] },
      { path: "detail", component: DetailVerilenTeklifComponent, canActivate: [authGuard] },

    ])
  ],

})
export class VerilenTeklifModule { }
