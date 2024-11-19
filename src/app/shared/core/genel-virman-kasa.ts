import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
  } from '@angular/core';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ICellEditorAngularComp } from '@ag-grid-community/angular';
  import { HesapPlaniSelectModalComponents } from 'src/app/shared/utilities/modals/hesap-plani-selected-modal';
  import { ICellEditorParams } from '@ag-grid-community/core';
  import { Subscription } from 'rxjs';
  import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';
import { KasaSelectModalComponents } from '../utilities/modals/kasa-selected-modal';
  @Component({
    selector: 'app-genel-virman-kasa-select',
    template: `
      <tr class="yks_table_group" style="display: grid; auto">
        <td
          style="
              display: flex;
              align-items: center;
              color: #212529;
              min-width: 130px;
              font-weight: 600;
              font-size: 13px; 
              display: flex;
              align-items:  center;
              font-style: oblique;position: relative; "
        >
          <input
            [(ngModel)]="value"
            [value]="value"
            style=" padding: 0px 0 0px 0.75rem; "
            [ngClass]="status ? 'form-control-required' : 'form-control-nullable'"
            class="form-control shadow-none "
            id="exampleFormControlInput1"
          />
  
          <div
            style="position: absolute;top: 0;right: 3px; display: flex;align-items: center;justify-content: center; height: 100%; width: 20px;"
          >
            <button
              (click)="selectDialogOpen()"
              style="height: 20px;
                                 border-radius: 0;
                                 border-left: 1px solid rgb(145, 145, 243);
                                width: 20px;
                                display: flex;
                                align-items: center;
                                justify-content: center;"
              class="selected-ellipsis btn"
            >
              <i class="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </td>
      </tr>
    `,
  })
  export class GenelVirmanKasaSelectComponent
    implements ICellEditorAngularComp, AfterViewInit
  {
    @Input() value: any;
    @Input() obj: any;
    private params: ICellEditorParams;
    @Input() status: any = true;
    @Output() public childFunc: EventEmitter<any> = new EventEmitter();
    selectedItem: any;
    selectedComp: any;
    constructor(
      private modalService: NgbModal,
      private readonly changeDetectorRef: ChangeDetectorRef
    ) {}
  
    selectDialogOpen() {
      const modalRef = this.modalService.open(KasaSelectModalComponents, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
      modalRef.result.then((Kasa) => {
        this.selectedItem = Kasa;
     
        this.childFunc.emit(this.selectedItem);
  
        this.value = this.selectedItem.kod;
        this.obj = this.selectedItem;
        this.params.data.ad = this.selectedItem.ad;
        this.params.data.KasaId=this.selectedItem.id
        this.params.stopEditing();
      });
    }
  
    ngAfterViewChecked(): void {
      this.changeDetectorRef.detectChanges();
    }
  
    agInit(params: ICellEditorParams): void {
      this.params = params;
  
      this.value = params.value;
    }
    ngAfterViewInit(): void {
      //open
    }
    private subscription: Subscription;
    ngOnDestroy(): void {
      // this.subscription.unsubscribe();
    }
  
    getValue(): any {
      return this.value;
    }
  }
  