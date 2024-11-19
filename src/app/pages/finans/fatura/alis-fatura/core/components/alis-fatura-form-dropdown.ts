import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HareketService } from 'src/app/core/services/repository/hareket.service';

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

                


             <select [formControl]="formControlNames" [(ngModel)]="field" style="height :21.5px;border-radius: 0;"  (ngModelChange)="selectedDropdown($event)"
              [ngClass]="status ? 'form-control-required' : 'form-control-nullable' "    class="form-select shadow-none"
                 aria-label="Default select example">
                 <option [selected]="selected" [ngValue]="null">Lütfen
                     seçim yapınız...
                 </option>
                 <option *ngFor="let item of IrsaliyeTuru" [ngValue]="item">
                     {{item.hareketTipiAdi}} </option>
             </select>

            </td>
        </tr>

            `,

})
export class AlisFaturaFormDropDownComponent implements AfterViewInit,OnInit {

    @Input() label: any;
    @Input() formControlNames: any;
    @Input() field: any;
    @Input() span: any;
    @Input() labelNone: any=true;
    @Input() dataSource: any=true;
    @Input() selected: any;
    @Input() status: any=true;
    @Output() public valueChangeFunc: EventEmitter<any> = new EventEmitter();

    constructor(private ref: ChangeDetectorRef,private HareketService:HareketService) {

    }
    IrsaliyeTuru:any;
   async ngOnInit() {
    this.IrsaliyeTuru= (await  this.HareketService.getByGrupNameId("Stok")).items

    }
    ngAfterViewInit(): void {
        this.ref.detectChanges()
    }
    selectedValue:any;
    selectedDropdown(item){
        if (event==undefined) {
            this.selectedValue=null
          }
          else{
            this.selectedValue = item;
            this.valueChangeFunc.emit(this.selectedValue)
          }
      
    }

}
