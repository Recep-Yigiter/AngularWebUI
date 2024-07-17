import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/Auth/guards/admin.guard';
import { RoleComponent } from '../role/role.component';



@NgModule({
  declarations: [
    AdministrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([

        // { path: "fatura", component: FaturaComponent, },


        {
            path: "",
            children: [
              { path: '', loadChildren: () => import("../role/role.module").then(m => m.RoleModule),canActivate:[AdminGuard] },
              { path: '', loadChildren: () => import("../user/user.module").then(m => m.UserModule),canActivate:[AdminGuard] },
            ],canActivate:[AdminGuard]
        },
        
    ])
  ]
})
export class AdministrationModule { }
