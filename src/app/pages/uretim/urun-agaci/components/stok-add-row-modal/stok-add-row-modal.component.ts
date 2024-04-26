import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/pages/stok/stok/core/services/stok.service';

@Component({
  selector: 'app-stok-add-row-modal',
  templateUrl: './stok-add-row-modal.component.html',
  styleUrls: ['./stok-add-row-modal.component.scss']
})
export class StokAddRowModalComponent {
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

    if (this.selectedRows) {
      var stok = {
        
        
        birimAdi: this.selectedRows.birimAdi,
        birimFiyat: this.selectedRows.birimFiyat,
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        ad:this.selectedRows.ad,
        kod:this.selectedRows.kod,
        miktar:1,
        aciklama:"",
        stokId: this.selectedRows.id,
        stokAdi: this.selectedRows.ad,
        stokKodu: this.selectedRows.kod,
        parentId:"",
        urunGrubu:"Kabin",
        tip : null,
        durum:null,
        urunAgaciBilesenler:[]
      }

      // model.ad = this.frm.value.ad;
      // model.kod = this.frm.value.kod;
      // model.miktar = 1;
      // model.aciklama = "";
      // model.durum = true;
      // model.stokId = this.selectedStok?.id ? this.selectedStok?.id : this.selectedParent?.id;
      // model.parentId = this.selectedParent?.id ? this.selectedParent?.id : "00000000-0000-0000-0000-000000000000";
      // model.urunGrubu = "Kabin";
      // model.tip = null;
      // model.durum = null;
      // model.urunAgaciBilesenler = [];

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
