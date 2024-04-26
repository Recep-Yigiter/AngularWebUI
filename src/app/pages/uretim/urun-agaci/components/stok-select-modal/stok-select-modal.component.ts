import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/pages/stok/stok/core/services/stok.service';

@Component({
  selector: 'app-stok-select-modal',
  templateUrl: './stok-select-modal.component.html',
  styleUrls: ['./stok-select-modal.component.scss']
})
export class StokSelectModalComponent  {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal, private StokService: StokService) {

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
    this.rowData = (await this.StokService.GetList(() => { })).data.items;
  }
  selectedRow: any;


  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
  }

  Stoks: any[] = [];
  close() {


    this.activeModal.close(this.selectedRow)

  }
}

