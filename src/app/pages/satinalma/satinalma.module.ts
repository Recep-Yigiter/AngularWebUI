import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatinalmaComponent } from './satinalma.component';
import { RouterModule } from '@angular/router';
import { AlinanTeklifComponent } from './alinan-teklif/alinan-teklif.component';
import { VerilenSiparisComponent } from './verilen-siparis/verilen-siparis.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';



@NgModule({
  declarations: [
    SatinalmaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      
      { path: 'alinan-teklif', component:AlinanTeklifComponent, loadChildren: () => import("../satinalma/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule) ,canActivate:[authGuard]},
      { path: 'verilen-siparis', component:VerilenSiparisComponent, loadChildren: () => import("../satinalma/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule) ,canActivate:[authGuard]},
        
        
    ])
  ]
})
export class SatinalmaModule { }
