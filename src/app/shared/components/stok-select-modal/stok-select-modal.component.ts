import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/pages/stok/stok/core/services/stok.service';

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
    this.rowData = (await this.StokService.GetList(() => { })).data.items;
  }
  selectedRows: any;


  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();

   
  }

stoks:any[]=[];
  close() {
    if (this.selectedRows) {

      this.selectedRows.forEach(element => {
        var stok = {
          siparisHareketTuru:1,
          siparisHareketTuruAdi:"Stok",
          teklifHareketTuru:1,
          teklifHareketTuruAdi:"Stok",
          giren:0,
          cikan:0,
          stokId: element.id,
          stokAdi: element.ad,
          stokKodu: element.kod,
          birimAdi: element.birimAdi,
          miktar: 1,
          iskonto: 0,
          iskontoTutar: 0,
          satirTutar:0 ,
          kdvTutar:0 ,
          birimFiyat: element.birimFiyat,
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        }
        this.stoks.push(stok)
      });


this.activeModal.close(this.stoks)

    }
  }
}
