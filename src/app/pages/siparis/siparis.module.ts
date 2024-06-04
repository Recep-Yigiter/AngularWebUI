import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiparisComponent } from './siparis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guard/auth.guard';



@NgModule({
  declarations: [
    SiparisComponent
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

        { path: "siparis", component: SiparisComponent,canActivate:[authGuard] },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../siparis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule) ,canActivate:[authGuard]},]
        },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../siparis/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule) ,canActivate:[authGuard]},]
        },
    ])
  ]
})
export class SiparisModule { }
