import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlisFaturaComponent } from './alis-fatura.component';
import { CreateAlisFaturaComponent } from './create-alis-fatura/create-alis-fatura.component';
import { UpdateAlisFaturaComponent } from './update-alis-fatura/update-alis-fatura.component';
import { DetailAlisFaturaComponent } from './detail-alis-fatura/detail-alis-fatura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

import { ListAlisFaturaComponent } from './list-alis-fatura/list-alis-fatura.component';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/guard/auth.guard';



@NgModule({
  declarations: [
    AlisFaturaComponent,
    CreateAlisFaturaComponent,
    UpdateAlisFaturaComponent,
    DetailAlisFaturaComponent,
    ListAlisFaturaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DirectiveModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "alis-faturasi", component: ListAlisFaturaComponent,canActivate:[authGuard]
       
      },
      {
        path: "alis-faturasi", component: AlisFaturaComponent,canActivate:[authGuard],
        children: [
          { path: "create", component: CreateAlisFaturaComponent ,canActivate:[authGuard]},
          { path: "update", component: UpdateAlisFaturaComponent,canActivate:[authGuard] },
          { path: "detail", component: DetailAlisFaturaComponent,canActivate:[authGuard] },
        ]
      }

    ])
  ]
})
export class AlisFaturaModule { }
