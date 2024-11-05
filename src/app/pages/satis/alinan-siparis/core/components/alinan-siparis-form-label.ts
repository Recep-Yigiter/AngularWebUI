import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-label',
    template: `
        <tr class="yks_table_group"  style="display: grid; grid-template-columns: {{span}}px auto">
            <td *ngIf="labelNone" class="pl-2 " style="
                border-right: 1px solid #ddd;
                color: #212529;
                width: 90%;
                padding: 0px 6px 0px 8px;
                min-width: 70px;
                font-weight: 600;
                font-size: 13px; 
                display: flex;
                align-items:  center;
                font-style: oblique; position: relative; " [style]="stylesLabel" >
                {{label}}
               <label  style="position: absolute; right: 0; font-style: oblique;color: #85919d;  font-weight: 600;
                font-size: 13px; padding-right: 10px; ">:</label>
            </td>

            <td  style="
                display: flex;
                align-items: center;
                color: #212529;
                min-width: 130px;
                font-weight: 600;
                font-size: 13px; 
                display: flex;
                align-items:  center;
                font-style: oblique;">

            <input [readonly]="readOnly"   [style]="stylesInput" [(ngModel)]="field"  [formControl]="formControlNames"  [ngClass]="status ? 'form-control-required' : 'form-control-nullable' "  class="form-control shadow-none  " id="exampleFormControlInput1"> 
            </td>
        </tr>

            `,
           

})
export class AlinanSiparisFormLabelComponent implements AfterViewInit {

    @Input() label: any;
    @Input() formControlNames: any;
    @Input() field: any;
    @Input() span: any;
    @Input() labelNone: any=true;
    @Input() status: any=true;
    @Input() stylesLabel: any;
    @Input() stylesInput: any;
    @Input() readOnly: boolean=false;


    constructor(private ref: ChangeDetectorRef) {

    }
    ngAfterViewInit(): void {
        this.ref.detectChanges()
    }

}