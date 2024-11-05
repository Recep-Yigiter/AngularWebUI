import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KasaComponent } from './kasa.component';
import { CreateKasaComponent } from './create-kasa/create-kasa.component';
import { DetailKasaComponent } from './detail-kasa/detail-kasa.component';
import { UpdateKasaComponent } from './update-kasa/update-kasa.component';
import { ListKasaComponent } from './list-kasa/list-kasa.component';
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
import { DesignComponent } from './core/design/design.component';
import { KasaHareketFormLabelComponent } from './core/components/kasa-hareket-form-label';
import { KasaHareketFormDateComponent } from './core/components/kasa-hareket-form-date';
import { KasaHareketFormInputSelectComponent } from './core/components/kasa-hareket-form-input-select';



@NgModule({
  declarations: [
    KasaComponent,
    CreateKasaComponent,
    DetailKasaComponent,
    UpdateKasaComponent,
    ListKasaComponent,
    DesignComponent,

    KasaHareketFormLabelComponent,
    KasaHareketFormDateComponent,
    KasaHareketFormInputSelectComponent
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

       { path: "list", component: ListKasaComponent,canActivate:[authGuard]},
       { path: "create", component: CreateKasaComponent,canActivate:[authGuard]},
       { path: "update", component: UpdateKasaComponent,canActivate:[authGuard]},
       { path: "detail", component: DetailKasaComponent,canActivate:[authGuard]},


    ])
  ]
})
export class KasaModule { }
