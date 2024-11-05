import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirmanComponent } from './virman.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { AngularSplitModule } from 'angular-split';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { VirmanCariComponent } from './virman-cari/virman-cari.component';
import { DesignComponent } from './core/design/design.component';
import { VirmanCariFormLabelComponent } from './core/components/virman-cari-form-label';
import { VirmanCariFormDateComponent } from './core/components/virman-cari-form-date';
import { VirmanCariFormInputSelectComponent } from './core/components/virman-cari-form-input-select';
import { VirmanCariFormDropDownComponent } from './core/components/virman-cari-form-dropdown';
import {DividerModule} from 'primeng/divider';
import { VirmanBankaComponent } from './virman-banka/virman-banka.component';
import { VirmanKasaComponent } from './virman-kasa/virman-kasa.component';
import { VirmanGenelComponent } from './virman-genel/virman-genel.component';


@NgModule({
  declarations: [
    VirmanComponent,
    VirmanCariComponent,
    DesignComponent,
    VirmanCariFormLabelComponent,
    VirmanCariFormDateComponent,
    VirmanCariFormInputSelectComponent,
    VirmanCariFormDropDownComponent,
    VirmanBankaComponent,
    VirmanKasaComponent,
    VirmanGenelComponent,
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
    DividerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
    //  { path: "virman-cari", component: VirmanCariComponent,canActivate:[authGuard]},
    ])
  ]
})
export class VirmanModule { }
