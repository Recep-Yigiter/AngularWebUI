import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';

@Component({
    selector: 'app-form-input-select',
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
                font-style: oblique;position: relative; ">

               
            <input style=" padding: 0px 0 0px 0.75rem; "  [(ngModel)]="field"  [formControl]="formControlNames" [ngClass]="status ? 'form-control-required' : 'form-control-nullable' "   class="form-control shadow-none " id="exampleFormControlInput1"> 

            
            <div style="position: absolute;top: 0;right: 3px; display: flex;align-items: center;justify-content: center; height: 100%; width: 20px;">
              <button (click)="selectDialogOpen()"   style="height: 20px;
                               border-radius: 0;
                               border-left: 1px solid rgb(145, 145, 243);
                              width: 20px;
                              display: flex;
                              align-items: center;
                              justify-content: center;" class="selected-ellipsis btn">
                   <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            </td>
        </tr>




            `,

})
export class FisFormInputSelectComponent implements AfterViewInit,AfterViewChecked {

    @Input() label: any;
    @Input() formControlNames: any;
    @Input() field: any;
    @Input() span: any;
    @Input() labelNone: any=true;
    @Input() component: any;
    @Input() status: any=true;
    @Output() public childFunc: EventEmitter<any> = new EventEmitter();
    selectedItem: any;
    selectedComp: any;
    constructor(private ref: ChangeDetectorRef,private modalService: NgbModal,private readonly changeDetectorRef: ChangeDetectorRef) {

    }
    ngAfterViewInit(): void {
        this.ref.detectChanges()
    }
    selectDialogOpen() {

        const modalRef = this.modalService.open(this.component, { size: 'xl', backdrop: 'static' });
        modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
        modalRef.result.then((bankaHesap) => {
            this.selectedItem=bankaHesap
            this.childFunc.emit(this.selectedItem)

        });
      }

      ngAfterViewChecked(): void {
        
        this.changeDetectorRef.detectChanges();
      }
}
