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
import { authGuard } from "src/app/Auth/guard/auth.guard";






@NgModule({
    declarations: [
        FaturaComponent
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

            { path: "fatura", component: FaturaComponent,canActivate:[authGuard] },
            {
                path: '',
                children: [{ path: '', loadChildren: () => import("../fatura/alis-fatura/alis-fatura.module").then(m => m.AlisFaturaModule),canActivate:[authGuard] },],canActivate:[authGuard]
            },
            {
                path: '', 
                children: [{ path: '', loadChildren: () => import("../fatura/satis-fatura/satis-fatura.module").then(m => m.SatisFaturaModule) ,canActivate:[authGuard]},],canActivate:[authGuard]
            },
        ])
    ]
})
export class FaturaModule { }
