import { Component, OnInit } from '@angular/core';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellClassParams,
} from 'ag-grid-community';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';

import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { UpdateVerilenSiparisComponent } from '../update-verilen-siparis/update-verilen-siparis.component';
import { CreateVerilenSiparisComponent } from '../create-verilen-siparis/create-verilen-siparis.component';

@Component({
  selector: 'app-list-verilen-siparis',
  templateUrl: './list-verilen-siparis.component.html',
  styleUrls: ['./list-verilen-siparis.component.scss'],
  providers: [DatePipe],
})
export class ListVerilenSiparisComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private SiparisService: SiparisService,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    { field: "createdDate", headerName: "Hareket Tarihi", width: 120, valueFormatter: params => this.DatePipe.transform(params.value, 'dd.MM.yyyy'), pinned: "left" },
    { field: "seri", headerName: "Seri", width: 70, pinned: "left" },
    { field: "belgeNo", headerName: "Belge No", width: 150, pinned: "left" },
    { field: "siparisTuruAdi", headerName: "Türü", width: 80, pinned: "left" },
    { field: "kdvTutar", headerName: "Kdv Tutarı", width: 100, cellRenderer: this.CurrencyCellRendererTR },
    { field: "satirOtv", headerName: "ÖTV Tutarı", width: 100, cellRenderer: this.CurrencyCellRendererTR },
    { field: "cariKodu", headerName: "Cari Kodu", width: 150 },
    { field: "cariAdi", headerName: "Cari Adı", width: 350 },
    { field: "referans", headerName: "Referans No", width: 150 },
    { field: "teslimatDurumuString", headerName: "Teslimat Durumu", width: 150, },
    { field: "teslimTarihi", headerName: "Teslim Tarihi", width: 150, valueFormatter: params => this.DatePipe.transform(params.value, 'dd.MM.yyyy') },
    { field: "siparisAlanPersonel", headerName: "Siparis Alan Personel" },
    { field: "aciklama", headerName: "Açıklama" },
    { field: "satirSayisi", headerName: "Satır S.", width: 80 },
    { field: "referansNo", headerName: "Ref. No" },
    { field: "genelToplam", headerName: "Toplam Tutar", pinned: "right", cellRenderer: this.CurrencyCellRendererTR },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.SiparisService.GetList(() => {})).items;
    this.rowData = this.rowData.filter(c => c.seri == "VS");
    this.rowData.forEach((item) => {
      item.siparisHareketler.forEach(siparisHareket => {
        siparisHareket.satirTutar = (siparisHareket.miktar * siparisHareket.birimFiyat);
        siparisHareket.iskontoTutar = (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
        siparisHareket.iskontoSonrasiTutar = (siparisHareket.satirTutar) - siparisHareket.iskontoTutar;
        siparisHareket.kdvTutar = (siparisHareket.iskontoSonrasiTutar) * Number(item.kdv) / 100;
        siparisHareket.genelToplam = siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar
      });

      item.satirTutar = item.siparisHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
      item.iskontoTutar = item.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
      item.iskontoSonrasiTutar = item.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
      item.kdvTutar = item.siparisHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
      item.satirOtv = (item.iskontoSonrasiTutar * item.otv) / 100;
      item.genelToplam = item.iskontoSonrasiTutar + item.kdvTutar;
      item.satirSayisi = item.siparisHareketler.length;

      if (item.teslimatDurumu == 0) {
        item.teslimatDurumuString = "Teslimat Yapılmadı"
      } else {
        item.teslimatDurumuString = "Teslim Edildi"
      }
    })

  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {
    this.updateModal();
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateVerilenSiparisComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';

    modalRef.result.then(async (item) => {
      if (item) {
        this.refresh();
      }
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateVerilenSiparisComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRow;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }

  async refresh() {
    window.location.reload();
  }

  delete() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.SiparisService.delete(this.selectedRow.id, () => {
            this.refresh();
          });
        }
      });
    }
  }
  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
}

function cellClass(params: CellClassParams) {
  if (params.value === 'Onaylandı') {
    return params.value === 'Onaylandı' ? 'rag-green' : 'rag-gray';
  } else if (params.value === 'Reddedildi') {
    return params.value === 'Reddedildi' ? 'rag-red' : 'rag-gray';
  } else {
    return params.value === 'Onay Bekliyor' ? 'rag-gray' : 'rag-gray';
  }
}
