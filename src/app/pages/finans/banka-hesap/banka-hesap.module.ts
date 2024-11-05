import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankaHesapComponent } from './banka-hesap.component';
import { ListBankaHesapComponent } from './list-banka-hesap/list-banka-hesap.component';
import { DesignComponent } from './core/design/design.component';
import { BankaHesapFormLabelComponent } from './core/components/banka-hesap-form-label';
import { BankaHesapFormDateComponent } from './core/components/banka-hesap-form-date';
import { BankaHesapFormInputSelectComponent } from './core/components/banka-hesap-form-input-select';
import { BankaHesapFormDropDownComponent } from './core/components/banka-hesap-form-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { AngularSplitModule } from 'angular-split';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { BankaHesapHareketlerComponent } from './core/components/banka-hesap-hareketler/banka-hesap-hareketler.component';



@NgModule({
  declarations: [
    BankaHesapComponent,
    ListBankaHesapComponent,
    DesignComponent,
    BankaHesapFormLabelComponent,
    BankaHesapFormDateComponent,
    BankaHesapFormInputSelectComponent,
    BankaHesapFormDropDownComponent,
    BankaHesapHareketlerComponent,
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

       { path: "list", component: ListBankaHesapComponent,canActivate:[authGuard]},
      
    ])
  ]
  
})
export class BankaHesapModule { }
