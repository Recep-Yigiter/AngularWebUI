import { CommonModule } from "@angular/common";
import { FaturaComponent } from "./fatura.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgGridAngular } from "ag-grid-angular";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AlisFaturaComponent } from "./alis-fatura/alis-fatura.component";
import { SatisFaturaComponent } from "./satis-fatura/satis-fatura.component";
import { authGuard } from "src/app/Auth/guards/auth.guard";






@NgModule({
    declarations: [
        FaturaComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
      
            { path: 'alis-fatura', loadChildren: () => import("../fatura/alis-fatura/alis-fatura.module").then(m => m.AlisFaturaModule),canActivate:[authGuard] },
            { path: 'satis-fatura', loadChildren: () => import("../fatura/satis-fatura/satis-fatura.module").then(m => m.SatisFaturaModule) ,canActivate:[authGuard]},
              
              
          ])



    ]
})
export class FaturaModule { }
