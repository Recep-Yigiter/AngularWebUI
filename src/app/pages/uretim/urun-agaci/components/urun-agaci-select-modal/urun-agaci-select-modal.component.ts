import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UrunAgaciService } from '../../core/services/urun-agaci.service';

@Component({
  selector: 'app-urun-agaci-select-modal',
  templateUrl: './urun-agaci-select-modal.component.html',
  styleUrls: ['./urun-agaci-select-modal.component.scss']
})
export class UrunAgaciSelectModalComponent{
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal, private UrunAgaciService: UrunAgaciService) {

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
    { field: "urunGrubu" },

  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.UrunAgaciService.GetList(() => { })).data.items;
  }
  selectedRow: any;


  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
  }

  UrunAgacis: any[] = [];
  close() {


    this.activeModal.close(this.selectedRow)

  }
}

