import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CariComponent } from './cari.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { ListCariComponent } from './list-cari/list-cari.component';
import { CreateCariComponent } from './create-cari/create-cari.component';
import { UpdateCariComponent } from './update-cari/update-cari.component';
import { DesignComponent } from './core/design/design.component';
import { AngularSplitModule } from 'angular-split';

import {TieredMenuModule} from 'primeng/tieredmenu';

import { CariFormInputSelectComponent } from './core/components/cari-form-input-select';
import { CariFormDropDownComponent } from './core/components/cari-form-dropdown';
import { CariFormLabelComponent } from './core/components/cari-form-label';
import { CariFormDateComponent } from './core/components/cari-form-date';
import { CariHesapComponent } from './core/components/cari-hesap/cari-hesap.component';
import { CariHareketlerComponent } from './core/components/cari-hareketler/cari-hareketler.component';
import { ListCariHareketComponent } from './core/components/list-cari-hareket/list-cari-hareket.component';
import { CariToplamComponent } from './core/components/cari-toplam/cari-toplam.component';
import { CariHareketlerModalComponent } from './core/components/cari-hareketler-modal/cari-hareketler-modal.component';


@NgModule({
  declarations: [
    CariComponent,
    ListCariComponent,
    CreateCariComponent,
    UpdateCariComponent,
    DesignComponent,
    CariFormLabelComponent,
    CariFormDateComponent,
    CariFormInputSelectComponent,
    CariFormDropDownComponent,
    ListCariHareketComponent,
    CariHesapComponent,
    CariHareketlerComponent,
    CariToplamComponent,
    CariHareketlerModalComponent,
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
       { path: "list", component: ListCariComponent,canActivate:[authGuard]},
       { path: "create", component: CreateCariComponent,canActivate:[authGuard]},
       { path: "update", component: UpdateCariComponent,canActivate:[authGuard]},
       { path: "cari-hesap", component: CariHesapComponent,canActivate:[authGuard]},
       { path: "cari-hareketler", component: CariHareketlerComponent,canActivate:[authGuard]},
       { path: "cari-toplam", component: CariToplamComponent,canActivate:[authGuard]},

    ])
  ]
})
export class CariModule { }
