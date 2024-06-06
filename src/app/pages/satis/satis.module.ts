import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisComponent } from './satis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/auth.guard';



@NgModule({
  declarations: [
    SatisComponent
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
            path: '',
            children: [
              { path: '', loadChildren: () => import("../teklif/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule),canActivate:[authGuard] },
              { path: '', loadChildren: () => import("../siparis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule) ,canActivate:[authGuard]},
            ],canActivate:[authGuard]
        },
        
    ])
  ]
})
export class SatisModule { }
