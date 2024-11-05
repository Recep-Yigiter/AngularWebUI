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
import { CreateAlinanTeklifComponent } from '../create-alinan-teklif/create-alinan-teklif.component';
import { UpdateAlinanTeklifComponent } from '../update-alinan-teklif/update-alinan-teklif.component';
import { CreateVerilenTeklifComponent } from 'src/app/pages/satis/verilen-teklif/create-verilen-teklif/create-verilen-teklif.component';
import { UpdateVerilenTeklifComponent } from 'src/app/pages/satis/verilen-teklif/update-verilen-teklif/update-verilen-teklif.component';

@Component({
  selector: 'app-list-alinan-teklif',
  templateUrl: './list-alinan-teklif.component.html',
  styleUrls: ['./list-alinan-teklif.component.scss'],
  providers: [DatePipe],
})
export class ListAlinanTeklifComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private TeklifService: TeklifService,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    // { field: "onay", headerName: "Onay Durumu", width: 130, pinned: "left", cellClass: cellClass,},
    {
      field: 'createdDate',
      headerName: 'Hareket Tarihi',
      width: 120,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
      pinned: 'left',
    },
    { field: 'seri', headerName: 'Seri', width: 70 },
    { field: 'belgeNo', headerName: 'Belge No', width: 150, pinned: 'left' },
    {
      field: 'kdv',
      headerName: 'Kdv(%)',
      width: 70,
      valueFormatter: (params) => params.data.kdv.toFixed(1) + '%',
    },
    {
      field: 'otv',
      headerName: 'Otv(%)',
      width: 70,
      valueFormatter: (params) => params.data.otv.toFixed(1) + '%',
    },
    { field: 'onay', headerName: 'Onay', width: 70 },
    { field: 'teklifTuruAdi', headerName: 'Türü', width: 80, pinned: 'left' },
    { field: 'durum', headerName: 'Durum', width: 80 },
    { field: 'cariKodu', headerName: 'Cari Kodu', width: 150 },
    { field: 'cariAdi', headerName: 'Cari Adı', width: 350 },
    { field: 'referans', headerName: 'Referans', width: 150 },
    {
      field: 'opsiyonTarihi',
      headerName: 'Opsiyon Tarihi',
      width: 150,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    { field: 'aciklama', headerName: 'Açıklama' },
    {
      field: 'genelToplam',
      headerName: 'Toplam Tutar',
      pinned: 'right',
      cellRenderer: this.CurrencyCellRendererTR,
    },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.TeklifService.GetList(() => {})).items;
    this.rowData = this.rowData.filter(c => c.seri == "AT");
    this.rowData.forEach((teklif) => {
      teklif.teklifHareketler.forEach((teklifHareket) => {
        teklifHareket.satirTutar =
          teklifHareket.miktar * teklifHareket.birimFiyat;
        teklifHareket.iskontoTutar =
          (teklifHareket.satirTutar * teklifHareket.iskonto) / 100;
        teklifHareket.iskontoSonrasiTutar =
          teklifHareket.satirTutar - teklifHareket.iskontoTutar;
        teklifHareket.kdvTutar =
          (teklifHareket.iskontoSonrasiTutar * Number(teklif.kdv)) / 100;
        teklifHareket.genelToplam =
          teklifHareket.iskontoSonrasiTutar + teklifHareket.kdvTutar;
      });
      teklif.kdv = Number(teklif.kdv);
      teklif.otv = Number(teklif.otv);

      teklif.satirTutar = teklif.teklifHareketler.reduce(
        (prev: any, next: any) => prev + next.satirTutar,
        0
      );
      teklif.iskontoTutar = teklif.teklifHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoTutar,
        0
      );
      teklif.iskontoSonrasiTutar = teklif.teklifHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoSonrasiTutar,
        0
      );
      teklif.kdvTutar = teklif.teklifHareketler.reduce(
        (prev: any, next: any) => prev + next.kdvTutar,
        0
      );
      teklif.satirOtv = (teklif.iskontoSonrasiTutar * teklif.otv) / 100;
      teklif.genelToplam = teklif.iskontoSonrasiTutar + teklif.kdvTutar;
      teklif.satirSayisi = teklif.teklifHareketler.length;
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
    const modalRef = this.NgbModal.open(CreateAlinanTeklifComponent, {
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
      const modalRef = this.NgbModal.open(UpdateAlinanTeklifComponent, {
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
          this.TeklifService.delete(this.selectedRow.id, () => {
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
