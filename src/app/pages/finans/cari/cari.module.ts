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
import { DetailCariComponent } from './detail-cari/detail-cari.component';
import { DesignComponent } from './core/design/design.component';
import { DetailCariHareketlerComponent } from './detail-cari-hareketler/detail-cari-hareketler.component';
import { AngularSplitModule } from 'angular-split';

import {TieredMenuModule} from 'primeng/tieredmenu';


@NgModule({
  declarations: [
    CariComponent,
    ListCariComponent,
    CreateCariComponent,
    UpdateCariComponent,
    DetailCariComponent,
    DesignComponent,
    DetailCariHareketlerComponent
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
       { path: "detail", component: DetailCariComponent,canActivate:[authGuard]},
       { path: "detail-cari-hareketler", component: DetailCariHareketlerComponent,canActivate:[authGuard]},

    ])
  ]
})
export class CariModule { }
