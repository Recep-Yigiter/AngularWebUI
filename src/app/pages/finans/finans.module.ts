import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinansComponent } from './finans.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import {DividerModule} from 'primeng/divider';



@NgModule({
  declarations: [
    FinansComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    DividerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([


        { path: 'cari', loadChildren: () => import("./cari/cari.module").then(m => m.CariModule),canActivate:[authGuard] },
        { path: 'banka', loadChildren: () => import("./banka/banka.module").then(m => m.BankaModule),canActivate:[authGuard] },
    ])
  ]
})
export class FinansModule { }
