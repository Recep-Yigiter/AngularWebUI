import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatinalmaComponent } from './satinalma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/auth.guard';



@NgModule({
  declarations: [
    SatinalmaComponent
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
              { path: '', loadChildren: () => import("../teklif/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule),canActivate:[authGuard] },
              { path: '', loadChildren: () => import("../siparis/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule),canActivate:[authGuard] },
            ],canActivate:[authGuard]
        },
        
    ])
  ]
})
export class SatinalmaModule { }
