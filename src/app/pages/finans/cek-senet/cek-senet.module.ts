import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CekSenetComponent } from './cek-senet.component';
import { ListCekSenetComponent } from './list-cek-senet/list-cek-senet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { AngularSplitModule } from 'angular-split';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DesignComponent } from './core/design/design.component';
import { CekSenetFormLabelComponent } from './core/components/cek-senet-form-label';
import { CekSenetFormDateComponent } from './core/components/cek-senet-form-date';
import { CekSenetFormInputSelectComponent } from './core/components/cek-senet-form-input-select';
import { CekSenetFormDropDownComponent } from './core/components/cek-senet-form-dropdown';
import { CreateCekSenetComponent } from './create-cek-senet/create-cek-senet.component';
import { UpdateCekSenetComponent } from './update-cek-senet/update-cek-senet.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ListCekSenetHareketComponent } from './list-cek-senet-hareket/list-cek-senet-hareket.component';
import { BankayaTahsilataVerildiComponent } from './components/bankaya-tahsilata-verildi/bankaya-tahsilata-verildi.component';
import { KasadanTahsilEdildiComponent } from './components/kasadan-tahsil-edildi/kasadan-tahsil-edildi.component';
import { BankadanTahsilKasaComponent } from './components/bankadan-tahsil-kasa/bankadan-tahsil-kasa.component';
import { CiroEdildiComponent } from './components/ciro-edildi/ciro-edildi.component';
import { IadeEdildiComponent } from './components/iade-edildi/iade-edildi.component';

@NgModule({
  declarations: [
    CekSenetComponent,
    ListCekSenetComponent,
    DesignComponent,
    CekSenetFormLabelComponent,
    CekSenetFormDateComponent,
    CekSenetFormInputSelectComponent,
    CekSenetFormDropDownComponent,
    CreateCekSenetComponent,
    UpdateCekSenetComponent,
    ListCekSenetHareketComponent,
    BankayaTahsilataVerildiComponent,
    KasadanTahsilEdildiComponent,
    BankadanTahsilKasaComponent,
    CiroEdildiComponent,
    IadeEdildiComponent,
  
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
    MatTabsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([

       { path: "list", component: ListCekSenetComponent,canActivate:[authGuard]},
       { path: "musteri-ceki", component: ListCekSenetComponent,canActivate:[authGuard]},
       { path: "musteri-senedi", component: ListCekSenetComponent,canActivate:[authGuard]},
       { path: "kendi-cekimiz", component: ListCekSenetComponent,canActivate:[authGuard]},
       { path: "kendi-senedimiz", component: ListCekSenetComponent,canActivate:[authGuard]},
       { path: "musteri-cek-senet", component: ListCekSenetComponent,canActivate:[authGuard]},
       { path: "kendi-cek-senet", component: ListCekSenetComponent,canActivate:[authGuard]},
      
    ])
  ]
})
export class CekSenetModule { }
