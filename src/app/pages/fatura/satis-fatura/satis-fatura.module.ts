import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisFaturaComponent } from './satis-fatura.component';
import { CreateSatisFaturaComponent } from './create-satis-fatura/create-satis-fatura.component';
import { UpdateSatisFaturaComponent } from './update-satis-fatura/update-satis-fatura.component';
import { DetailSatisFaturaComponent } from './detail-satis-fatura/detail-satis-fatura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

import { ListSatisFaturaComponent } from './list-satis-fatura/list-satis-fatura.component';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { MatBadgeModule } from '@angular/material/badge';
import { DesignComponent } from './core/design/design.component';


@NgModule({
  declarations: [
    SatisFaturaComponent,
    CreateSatisFaturaComponent,
    UpdateSatisFaturaComponent,
    DetailSatisFaturaComponent,
    ListSatisFaturaComponent,
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: "list", component: ListSatisFaturaComponent, },
      { path: "create", component: CreateSatisFaturaComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateSatisFaturaComponent, canActivate: [authGuard] },
      { path: "detail", component: DetailSatisFaturaComponent, canActivate: [authGuard] },
    ])
  ]
})
export class SatisFaturaModule { }
