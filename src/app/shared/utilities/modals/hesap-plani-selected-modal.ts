import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HesapService } from 'src/app/core/services/repository/hesap.service';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { NgClass } from '@angular/common';
import {Input, AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorParams } from '@ag-grid-community/core';

@Component({
    selector: 'app-Hesap-select-modal',
    styleUrls: ['../modal.scss'],
    template: `
  <div class="modal-header ">

<h4 class="modal-title"></h4>

<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.close(false)"></button>
</div>

<div class="">

<app-design w100="width:100%;" displayNone="display:none;">


    <div design-search style="width: 100%;">
        <div class="p-inputgroup" style="background-color: white; border: 1px solid #ccc; ">
            <input type="text" class="shadow-none form-control" pInputText placeholder="Ara...">
            <span class="p-inputgroup-addon" style="background: transparent;border: none; padding: 0 0.2rem;min-width: 2rem;">
                <i class="fa fa-search"></i>
            </span>
        </div>
    </div>


    <div full-page-filter> </div>

    <div full-page style="height: 100%;">


        <div>

            <ag-grid-angular style="width: 100%; height:390px;"
            class="ag-theme-quartz" 
            [rowData]="rowData" 
            [columnDefs]="colDefs"
       
            (gridReady)="getList($event)"
            (rowClicked)="onSelectionChanged()"
            [rowSelection]="rowSelection" 
            [rowHeight]="22" 
            [headerHeight]="23">
        </ag-grid-angular>

        </div>

    </div>

</app-design>

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="close()"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    <i class="fa fa-plus" style="color: #fff; margin-right: 5px; font-weight: 700;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Seç</span>
</button>
<button type="button" class="btn "  (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #fdfdfd; border: 1px solid #e6e6e6;">
    <i class="fa fa-times" style="color: #000; margin-right: 5px; font-weight: 600;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Vazgeç</span>
</button>
</div>
  `

})
export class HesapPlaniSelectModalComponents implements AfterViewInit {
    private params: any;

    @ViewChild('container', { read: ViewContainerRef }) public container!: ViewContainerRef;
    public happy = false;


    constructor(public activeModal: NgbActiveModal, private HesapService: HesapService) {

    }
    ngAfterViewInit(): void {
    }
   


    rowData: any[];

    public rowSelection: 'single' | 'multiple' = 'multiple';
    private gridApi!: GridApi<any>;

    colDefs: ColDef[] = [
        { field: "kod" },
        {
            field: "ad",
            minWidth: 200
        },


    ];


    async getList(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        this.rowData = (await this.HesapService.GetList(() => { })).items;
    }
    selectedRow: any;


    onSelectionChanged() {
        this.selectedRow = this.gridApi.getSelectedRows()[0];
    }

    Hesaps: any[] = [];
    close() {


        this.activeModal.close(this.selectedRow)

    }
}

