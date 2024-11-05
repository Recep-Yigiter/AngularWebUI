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

import { IrsaliyeService } from 'src/app/core/services/repository/irsaliye.service';
import { CreateSatisIrsaliyeComponent } from '../create-satis-irsaliye/create-satis-irsaliye.component';
import { UpdateSatisIrsaliyeComponent } from '../update-satis-irsaliye/update-satis-irsaliye.component';

@Component({
  selector: 'app-list-satis-irsaliye',
  templateUrl: './list-satis-irsaliye.component.html',
  styleUrls: ['./list-satis-irsaliye.component.scss'],
  providers: [DatePipe],
})
export class ListSatisIrsaliyeComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private IrsaliyeService: IrsaliyeService,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    {
      field: 'createdDate',
      headerName: 'Hareket Tarihi',
      width: 120,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
      pinned: 'left',
    },
    { field: 'seri', headerName: 'Seri', width: 70, pinned: 'left' },
    { field: 'belgeNo', headerName: 'Belge No', width: 150, pinned: 'left' },
    { field: 'siparisTuruAdi', headerName: 'Türü', width: 80, pinned: 'left' },
    {
      field: 'kdvTutar',
      headerName: 'Kdv Tutarı',
      width: 100,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    {
      field: 'satirOtv',
      headerName: 'ÖTV Tutarı',
      width: 100,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    { field: 'cariKodu', headerName: 'Cari Kodu', width: 150 },
    {
      field: 'cariAdi',
      headerName: 'Cari Adı',
      width: 350,
      filter: 'agTextColumnFilter',
    },
    { field: 'referans', headerName: 'Referans No', width: 150 },
    {
      field: 'teslimatDurumuString',
      headerName: 'Teslimat Durumu',
      width: 150,
    },
    {
      field: 'teslimTarihi',
      headerName: 'Teslim Tarihi',
      width: 150,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    { field: 'siparisAlanPersonel', headerName: 'Siparis Alan Personel' },
    { field: 'aciklama', headerName: 'Açıklama' },
    { field: 'satirSayisi', headerName: 'Satır S.', width: 80 },
    { field: 'referansNo', headerName: 'Ref. No' },
    {
      field: 'genelToplam',
      headerName: 'Toplam Tutar',
      pinned: 'right',
      cellRenderer: this.CurrencyCellRendererTR,
    },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.IrsaliyeService.GetList(() => {})).items;
    this.rowData = this.rowData.filter((c) => c.seri == 'SI');

    this.rowData.forEach((item) => {
      item.irsaliyeHareketler.forEach((siparisHareket) => {
        siparisHareket.satirTutar =
          siparisHareket.miktar * siparisHareket.birimFiyat;
        siparisHareket.iskontoTutar =
          (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
        siparisHareket.iskontoSonrasiTutar =
          siparisHareket.satirTutar - siparisHareket.iskontoTutar;
        siparisHareket.kdvTutar =
          (siparisHareket.iskontoSonrasiTutar * Number(item.kdv)) / 100;
        siparisHareket.genelToplam =
          siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar;
      });

      item.satirTutar = item.irsaliyeHareketler.reduce(
        (prev: any, next: any) => prev + next.satirTutar,
        0
      );
      item.iskontoTutar = item.irsaliyeHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoTutar,
        0
      );
      item.iskontoSonrasiTutar = item.irsaliyeHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoSonrasiTutar,
        0
      );
      item.kdvTutar = item.irsaliyeHareketler.reduce(
        (prev: any, next: any) => prev + next.kdvTutar,
        0
      );
      item.satirOtv = (item.iskontoSonrasiTutar * item.otv) / 100;
      item.genelToplam = item.iskontoSonrasiTutar + item.kdvTutar;
      item.satirSayisi = item.irsaliyeHareketler.length;

      if (item.teslimatDurumu == 0) {
        item.teslimatDurumuString = 'Teslimat Yapılmadı';
      } else {
        item.teslimatDurumuString = 'Teslim Edildi';
      }
    });
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
    const modalRef = this.NgbModal.open(CreateSatisIrsaliyeComponent, {
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
      const modalRef = this.NgbModal.open(UpdateSatisIrsaliyeComponent, {
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
          this.IrsaliyeService.delete(this.selectedRow.id, () => {
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
