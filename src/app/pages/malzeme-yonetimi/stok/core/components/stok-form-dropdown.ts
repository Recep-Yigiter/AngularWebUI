import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-dropdown',
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
                font-style: oblique; position: relative;">
                {{label}}
               <label  style="position: absolute; right: 0; font-style: oblique;color: #85919d;  font-weight: 600;
                font-size: 13px; padding-right: 10px; ">:</label>
            </td>

            <td style="
                display: flex;
                align-items: center;
                color: #212529;
                min-width: 130px;
                font-weight: 600;
                font-size: 13px; 
                display: flex;
                align-items:  center;
                font-style: oblique;">

                


             <select [formControl]="formControlNames" [(ngModel)]="field" style="height :21.5px;border-radius: 0;"
              [ngClass]="status ? 'form-control-required' : 'form-control-nullable' "    class="form-select shadow-none"
                 aria-label="Default select example">
                 <option [selected]="selected" [ngValue]="null">Lütfen
                     seçim yapınız...
                 </option>
                 <option *ngFor="let item of dataSource" [ngValue]="item">
                     {{item.ad}} </option>
             </select>

            </td>
        </tr>

            `,

})
export class StokFormDropDownComponent implements AfterViewInit {

    @Input() label: any;
    @Input() formControlNames: any;
    @Input() field: any;
    @Input() span: any;
    @Input() labelNone: any=true;
    @Input() dataSource: any=true;
    @Input() selected: any;
    @Input() status: any=true;


    constructor(private ref: ChangeDetectorRef) {

    }
    ngAfterViewInit(): void {
        this.ref.detectChanges()
    }

}
