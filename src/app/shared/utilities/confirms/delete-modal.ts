import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankaService } from 'src/app/core/services/repository/banka.service';

@Component({
    selector: 'app-delete-modal',
    styleUrls: ['../modal.scss'],
    template: `
<div class="modal-header ">

<h4 class="modal-title">Uyarı! </h4>
<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.close(false)"></button>
</div>

<div class="">

Silmek istediğinize emin misiniz?

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="activeModal.close(true)"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    <i class="fa fa-plus" style="color: #fff; margin-right: 5px; font-weight: 700;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Evet</span>
</button>
<button type="button" class="btn "  (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #fdfdfd; border: 1px solid #e6e6e6;">
    <i class="fa fa-times" style="color: #000; margin-right: 5px; font-weight: 600;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Hayır</span>
</button>
</div>
  `

})
export class DeleteModalComponents {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;

    constructor(public activeModal: NgbActiveModal, private BankaService: BankaService) {

    }

    rowData: any[];

    public rowSelection: 'single' | 'multiple' = 'multiple';
    private gridApi!: GridApi<any>;

    colDefs: ColDef[] = [
        {
            field: "ad",
            minWidth: 200
        },
        { field: "kod" },


    ];


    async getList(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        this.rowData = (await this.BankaService.GetList(() => { })).items;
    }
    selectedRow: any;


    onSelectionChanged() {
        this.selectedRow = this.gridApi.getSelectedRows()[0];
    }

    Bankas: any[] = [];
    close() {


        this.activeModal.close(this.selectedRow)

    }
}

