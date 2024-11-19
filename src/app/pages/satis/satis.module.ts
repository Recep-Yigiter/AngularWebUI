import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisComponent } from './satis.component';
import { RouterModule } from '@angular/router';
import { VerilenTeklifComponent } from './verilen-teklif/verilen-teklif.component';
import { AlinanSiparisComponent } from './alinan-siparis/alinan-siparis.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';



@NgModule({
  declarations: [
    SatisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([

      { path: 'verilen-teklif', component:VerilenTeklifComponent, loadChildren: () => import("../satis/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule) ,canActivate:[authGuard]},
      { path: 'alinan-siparis', component:AlinanSiparisComponent, loadChildren: () => import("../satis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule) ,canActivate:[authGuard]},

    ])
  ]
})
export class SatisModule { }
