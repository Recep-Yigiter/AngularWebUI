import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { KasaHareketComponent } from './kasa-hareket.component';

import { UpdateKasaHareketComponent } from './update-kasa-hareket/update-kasa-hareket.component';
import { DetailKasaHareketComponent } from './detail-kasa-hareket/detail-kasa-hareket.component';
import { ListKasaHareketComponent } from './list-kasa-hareket/list-kasa-hareket.component';
import { CreateKasaHareketComponent } from './create-kasa-hareket/create-kasa-hareket.component';
import { DesignComponent } from './core/design/design.component';
import { KasaHareketFormInputSelectComponent } from './core/components/kasa-hareket-form-input-select';
import { KasaHareketFormDateComponent } from './core/components/kasa-hareket-form-date';
import { KasaHareketFormLabelComponent } from './core/components/kasa-hareket-form-label';
import { ListKasaComponent } from '../kasa/list-kasa/list-kasa.component';
import { CreateKasaComponent } from '../kasa/create-kasa/create-kasa.component';
import { UpdateKasaComponent } from '../kasa/update-kasa/update-kasa.component';
import { DetailKasaComponent } from '../kasa/detail-kasa/detail-kasa.component';

@NgModule({
  declarations: [
    KasaHareketComponent,
    UpdateKasaHareketComponent,
    DetailKasaHareketComponent,
    ListKasaHareketComponent,
    CreateKasaHareketComponent,
    DesignComponent,
    KasaHareketFormLabelComponent,
    KasaHareketFormDateComponent,
    KasaHareketFormInputSelectComponent
  ],
  imports: [CommonModule
    , FormsModule,
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
  ],
})
export class KasaHareketModule {}
