import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { UrunReceteHareketService } from 'src/app/core/services/repository/urun-recete-hareket.service';

@Component({
  selector: 'app-list-urun-recete-hareket',
  templateUrl: './list-urun-recete-hareket.component.html',
  styleUrls: ['./list-urun-recete-hareket.component.scss'],
})
export class ListUrunReceteHareketComponent {
  @Input() confirmationBoxTitle;
  @Input() urunReceteData;
  stateData: any;
  constructor(
    public activeModal: NgbActiveModal,
    private StokService: StokService,
    private UrunReceteHareketService: UrunReceteHareketService,
    private NgbModal: NgbModal
  ) {
    this.stateData = history.state;
  }

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    { field: 'stokAdi', headerName: 'Stok Adı', minWidth: 200 },
    { field: 'stokKodu', headerName: 'StokKodu', width: 120 },
    {
      field: 'miktar',
      headerName: 'Miktar',
      editable: true,
      valueFormatter: (params) => params.data.miktar.toFixed(2),
      onCellValueChanged: (event) => {
        this.urunReceteHareketUpdete(event);
      },
      width: 100,
    },
    { field: 'birimAdi', width: 100 },
    { field: 'birimFiyat', width: 100 },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.urunReceteData.urunReceteHareketler;
  }
  selectedRow: any;

  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  async urunReceteHareketUpdete(event) {
    const urunReceteHareket = await this.UrunReceteHareketService.getByHourId(
      event.data.hourId,
      () => {}
    );
    urunReceteHareket.miktar = event.data.miktar;
    this.UrunReceteHareketService.update(urunReceteHareket, () => {});
  }

  Stoks: any[] = [];
  close() {
    this.activeModal.close(this.selectedRow);
  }

  stokSelectModal() {
    const modalRef = this.NgbModal.open(StokSelectModalComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stoks) => {
      if (stoks != false) {
        stoks.forEach((stok) => {
       
          let urunReceteHareket = {
            urunReceteId: this.urunReceteData.id,
            stokId: stok.stokId,
            miktar: stok.miktar,
            hourId: String(new Date().valueOf()),
          };

          this.UrunReceteHareketService.create(
            urunReceteHareket,
            () => {},
            (errorMessage) => {}
          );
          this.gridApi.applyTransaction({
            add: [stok],
            addIndex: this.gridApi.getLastDisplayedRow() + 1,
          });
        });
      }
    });
  }
}
