import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HesapPlaniComponent } from './hesap-plani.component';
import { ListHesapPlaniComponent } from './list-hesap-plani/list-hesap-plani.component';
import { CreateHesapPlaniComponent } from './create-hesap-plani/create-hesap-plani.component';
import { UpdateHesapPlaniComponent } from './update-hesap-plani/update-hesap-plani.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { AngularSplitModule } from 'angular-split';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DesignComponent } from './core/design/design.component';
import { HesapFormLabelComponent } from './core/components/hesap-form-label';
import { HesapFormDateComponent } from './core/components/hesap-form-date';
import { HesapFormInputSelectComponent } from './core/components/hesap-form-input-select';
import { HesapFormDropDownComponent } from './core/components/hesap-form-dropdown';


@NgModule({
  declarations: [
    HesapPlaniComponent,
    ListHesapPlaniComponent,
    CreateHesapPlaniComponent,
    UpdateHesapPlaniComponent,
    DesignComponent,
    HesapFormLabelComponent,
    HesapFormDateComponent,
    HesapFormInputSelectComponent,
    HesapFormDropDownComponent,
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
    TieredMenuModule,

    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
       { path: "list", component: ListHesapPlaniComponent,canActivate:[authGuard]},
       { path: "create", component: CreateHesapPlaniComponent,canActivate:[authGuard]},
       { path: "update", component: UpdateHesapPlaniComponent,canActivate:[authGuard]},
      

    ])
  ]
})
export class HesapPlaniModule { }
