import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisComponent } from './satis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { VerilenTeklifComponent } from './verilen-teklif/verilen-teklif.component';
import { AlinanSiparisComponent } from './alinan-siparis/alinan-siparis.component';
import {DividerModule} from 'primeng/divider';



@NgModule({
  declarations: [
    SatisComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    RouterModule.forChild([

      { path: 'verilen-teklif', component:VerilenTeklifComponent, loadChildren: () => import("../satis/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule) ,canActivate:[authGuard]},
      { path: 'alinan-siparis', component:AlinanSiparisComponent, loadChildren: () => import("../satis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule) ,canActivate:[authGuard]},

    ])
  ]
})
export class SatisModule { }
