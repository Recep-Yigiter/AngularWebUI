import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/core/services/repository/stok.service';

@Component({
  selector: 'app-stok-select-modal',
  templateUrl: './stok-select-modal.component.html',
  styleUrls: ['./stok-select-modal.component.scss']
})
export class StokSelectModalComponent {
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
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
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
    this.rowData = (await this.StokService.GetList(() => { })).items;
  }
  selectedRows: any;


  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();

    if (this.selectedRows) {
      var stok = {
        stokId: this.selectedRows.id,
        stokAdi: this.selectedRows.ad,
        stokKodu: this.selectedRows.kod,
        birimAdi: this.selectedRows.birimAdi,
        miktar: 1,
        birimFiyat: this.selectedRows.birimFiyat,
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      }


      // this.activeModal.close(stok)
    }

  }

stoks:any[]=[];
  close() {
    if (this.selectedRows) {

      this.selectedRows.forEach(element => {
        var stok = {
          stokId: element.id,
          stokAdi: element.ad,
          stokKodu: element.kod,
          birimAdi: element.birimAdi,
          miktar: 1,
          birimFiyat: element.birimFiyat,
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        }
        this.stoks.push(stok)
      });


this.activeModal.close(this.stoks)

    }
  }
}
