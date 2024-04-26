import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CariService } from 'src/app/pages/finans/cari/services/cari.service';

@Component({
  selector: 'app-cari-select-modal',
  templateUrl: './cari-select-modal.component.html',
  styleUrls: ['./cari-select-modal.component.scss']
})
export class CariSelectModalComponent  {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal, private CariService: CariService) {

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
    { field: "birimAdi" },

  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.CariService.GetList(() => { })).data.items;
  }
  selectedRow: any;


  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
  }

  Caris: any[] = [];
  close() {


    this.activeModal.close(this.selectedRow)

  }
}

