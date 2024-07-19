import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlinanSiparisComponent } from './alinan-siparis.component';
import { CreateAlinanSiparisComponent } from './create-alinan-siparis/create-alinan-siparis.component';
import { UpdateAlinanSiparisComponent } from './update-alinan-siparis/update-alinan-siparis.component';
import { DetailAlinanSiparisComponent } from './detail-alinan-siparis/detail-alinan-siparis.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';


import { MatBadgeModule } from '@angular/material/badge';
import { CurrencyInputDirective } from 'src/app/shared/directives/currency-input.directive';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { ListAlinanSiparisComponent } from './list-alinan-siparis/list-alinan-siparis.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { DesignComponent } from './core/design/design.component';


@NgModule({
  declarations: [
    AlinanSiparisComponent,
    CreateAlinanSiparisComponent,
    UpdateAlinanSiparisComponent,
    DetailAlinanSiparisComponent,
    ListAlinanSiparisComponent,
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
      { path: "list", component: ListAlinanSiparisComponent, canActivate: [authGuard] },
      { path: "create", component: CreateAlinanSiparisComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateAlinanSiparisComponent, canActivate: [authGuard] },
      { path: "detail", component: DetailAlinanSiparisComponent, canActivate: [authGuard] },

    ])
  ],

})
export class AlinanSiparisModule { }
