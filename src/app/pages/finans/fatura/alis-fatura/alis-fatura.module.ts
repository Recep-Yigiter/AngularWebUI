import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlisFaturaComponent } from './alis-fatura.component';
import { CreateAlisFaturaComponent } from './create-alis-fatura/create-alis-fatura.component';
import { UpdateAlisFaturaComponent } from './update-alis-fatura/update-alis-fatura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

import { ListAlisFaturaComponent } from './list-alis-fatura/list-alis-fatura.component';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { MatBadgeModule } from '@angular/material/badge';
import { DesignComponent } from './core/design/design.component';

import { AngularSplitModule } from 'angular-split';
import { AlisFaturaFormLabelComponent } from './core/components/alis-fatura-form-label';
import { AlisFaturaFormDateComponent } from './core/components/alis-fatura-form-date';
import { AlisFaturaFormInputSelectComponent } from './core/components/alis-fatura-form-input-select';
import { AlisFaturaFormDropDownComponent } from './core/components/alis-fatura-form-dropdown';
import { AlisFaturaFormNumberInputComponent } from './core/components/alis-fatura-form-number-input';

import { AlisFaturaFormCheckboxComponent } from './core/components/alis-fatura-farm-checkbox';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [
    AlisFaturaComponent,
    CreateAlisFaturaComponent,
    UpdateAlisFaturaComponent,
    ListAlisFaturaComponent,
    DesignComponent,
    AlisFaturaFormLabelComponent,
    AlisFaturaFormDateComponent,
    AlisFaturaFormInputSelectComponent,
    AlisFaturaFormDropDownComponent,
    AlisFaturaFormNumberInputComponent,
    AlisFaturaFormCheckboxComponent,

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
    DividerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: "list", component: ListAlisFaturaComponent, canActivate: [authGuard] },
      { path: "create", component: CreateAlisFaturaComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateAlisFaturaComponent, canActivate: [authGuard] },
  
    ])
  ]
})
export class AlisFaturaModule { }
