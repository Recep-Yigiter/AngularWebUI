import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankaComponent } from './banka.component';
import { CreateBankaComponent } from './create-banka/create-banka.component';
import { UpdateBankaComponent } from './update-banka/update-banka.component';
import { DetailBankaComponent } from './detail-banka/detail-banka.component';
import { ListBankaComponent } from './list-banka/list-banka.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DesignComponent } from './core/design/design.component';
import { CreateBankaHesapModalComponent } from './create-banka-hesap-modal/create-banka-hesap-modal.component';

import {MatRadioModule} from '@angular/material/radio';
import { AngularSplitModule } from 'angular-split';



@NgModule({
  declarations: [
    BankaComponent,
    CreateBankaComponent,
    UpdateBankaComponent,
    DetailBankaComponent,
    ListBankaComponent,
    DesignComponent,
    CreateBankaHesapModalComponent
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
    MatRadioModule,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([

       { path: "list", component: ListBankaComponent,canActivate:[authGuard]},
       { path: "create", component: CreateBankaComponent,canActivate:[authGuard]},
       { path: "update", component: UpdateBankaComponent,canActivate:[authGuard]},
       { path: "detail", component: DetailBankaComponent,canActivate:[authGuard]},

    ])
  ]
})
export class BankaModule { }
