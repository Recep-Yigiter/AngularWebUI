import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlisIrsaliyeComponent } from './alis-irsaliye.component';
import { CreateAlisIrsaliyeComponent } from './create-alis-irsaliye/create-alis-irsaliye.component';
import { UpdateAlisIrsaliyeComponent } from './update-alis-irsaliye/update-alis-irsaliye.component';
import { DetailAlisIrsaliyeComponent } from './detail-alis-irsaliye/detail-alis-irsaliye.component';
import { ListAlisIrsaliyeComponent } from './list-alis-irsaliye/list-alis-irsaliye.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DesignComponent } from './core/design/design.component';
import { AngularSplitModule } from 'angular-split';
import { AlisIrsaliyeFormLabelComponent } from './core/components/alis-irsaliye-form-label';
import { AlisIrsaliyeFormDateComponent } from './core/components/alis-irsaliye-form-date';
import { AlisIrsaliyeFormInputSelectComponent } from './core/components/alis-irsaliye-form-input-select';
import { AlisIrsaliyeFormDropDownComponent } from './core/components/alis-irsaliye-form-dropdown';
import { AlisIrsaliyeFormNumberInputComponent } from './core/components/alis-irsaliye-form-number-input';
import { AlisIrsaliyeFormCheckboxComponent } from './core/components/alis-irsaliye-farm-checkbox';
@NgModule({
  declarations: [
    AlisIrsaliyeComponent,
    CreateAlisIrsaliyeComponent,
    UpdateAlisIrsaliyeComponent,
    DetailAlisIrsaliyeComponent,
    ListAlisIrsaliyeComponent,
    DesignComponent,
    AlisIrsaliyeFormLabelComponent,
    AlisIrsaliyeFormDateComponent,
    AlisIrsaliyeFormInputSelectComponent,
    AlisIrsaliyeFormDropDownComponent,
    AlisIrsaliyeFormNumberInputComponent,
    AlisIrsaliyeFormCheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DirectiveModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: 'list',
        component: ListAlisIrsaliyeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'create',
        component: CreateAlisIrsaliyeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'update',
        component: UpdateAlisIrsaliyeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'detail',
        component: DetailAlisIrsaliyeComponent,
        canActivate: [authGuard],
      },
    ]),
  ],
})
export class AlisIrsaliyeModule {}
