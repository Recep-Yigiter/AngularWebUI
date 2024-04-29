import { CommonModule } from "@angular/common";
import { FaturaComponent } from "./fatura.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgGridAngular } from "ag-grid-angular";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";






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

            {
                path: "fatura", component: FaturaComponent
            },

        ])
    ]
})
export class FaturaModule { }
