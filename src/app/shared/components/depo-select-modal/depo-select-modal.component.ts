import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepoService } from 'src/app/core/services/repository/depo.service';

@Component({
  selector: 'app-depo-select-modal',
  templateUrl: './depo-select-modal.component.html',
  styleUrls: ['./depo-select-modal.component.scss']
})
export class DepoSelectModalComponent {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal, private DepoService: DepoService) {

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
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.DepoService.GetList(() => { })).items;
  
  }
  selectedRow: any;


  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
  }

  Depos: any[] = [];
  close() {


    this.activeModal.close(this.selectedRow)

  }
}

