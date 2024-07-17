import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatinalmaComponent } from './satinalma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { AlinanSiparisComponent } from '../satis/alinan-siparis/alinan-siparis.component';
import { AlinanTeklifComponent } from './alinan-teklif/alinan-teklif.component';
import { VerilenSiparisComponent } from './verilen-siparis/verilen-siparis.component';



@NgModule({
  declarations: [
    SatinalmaComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // AgGridAngular,
    // MatIconModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      
      { path: 'alinan-teklif', component:AlinanTeklifComponent, loadChildren: () => import("../satinalma/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule) ,canActivate:[authGuard]},
      { path: 'verilen-siparis', component:VerilenSiparisComponent, loadChildren: () => import("../satinalma/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule) ,canActivate:[authGuard]},
        
        
    ])
  ]
})
export class SatinalmaModule { }
