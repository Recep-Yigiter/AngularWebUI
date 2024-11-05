import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuhasebeComponent } from './muhasebe.component';
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
    MuhasebeComponent
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
         { path: 'hesap-plani', loadChildren: () => import("./hesap-plani/hesap-plani.module").then(m => m.HesapPlaniModule),canActivate:[authGuard] },
      
    ])
  ]
})
export class MuhasebeModule { }
