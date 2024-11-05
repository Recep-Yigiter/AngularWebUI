import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { FaturaService } from 'src/app/core/services/repository/fatura.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import * as resize from '../../../../../assets/js/resizable-layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
@Component({
  selector: 'app-list-alis-fatura',
  templateUrl: './list-alis-fatura.component.html',
  styleUrls: ['./list-alis-fatura.component.scss'],
  providers: [DatePipe],
})
export class ListAlisFaturaComponent implements OnInit {
  rowData: any[];
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  // this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
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

  /**
   *
   */
  constructor(
    private FaturaService: FaturaService,
    private router: Router,
    private DatePipe: DatePipe,
    private NgbModal: NgbModal
  ) {}
  ngOnInit(): void {
    resize.resizeFunction();
  }

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
  rowDataCount: any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.FaturaService.GetList(() => {})).items;
    this.rowData = this.rowData.filter((c) => c.seri == 'AF');
    this.rowData.sort((val1, val2) => {
      return <any>new Date(val2.createdDate) - <any>new Date(val1.createdDate);
    });

    this.rowData.forEach((rowData) => {
      const dateParts = rowData.createdDate.split('/');
      return {
        ...rowData,
        createdDate: `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
        dateObject: new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0])
        ),
      };
    });

    this.rowDataCount = this.rowData.length;

    this.rowData.forEach((siparis) => {
      siparis.faturaHareketler.forEach((siparisHareket) => {
        siparisHareket.satirTutar =
          siparisHareket.miktar * siparisHareket.birimFiyat;
        siparisHareket.iskontoTutar =
          (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
        siparisHareket.iskontoSonrasiTutar =
          siparisHareket.satirTutar - siparisHareket.iskontoTutar;
        siparisHareket.kdvTutar =
          (siparisHareket.iskontoSonrasiTutar * Number(siparis.kdv)) / 100;
        siparisHareket.genelToplam =
          siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar;
      });

      siparis.satirTutar = siparis.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.satirTutar,
        0
      );
      siparis.iskontoTutar = siparis.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoTutar,
        0
      );
      siparis.iskontoSonrasiTutar = siparis.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoSonrasiTutar,
        0
      );
      siparis.kdvTutar = siparis.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.kdvTutar,
        0
      );
      siparis.satirOtv = (siparis.iskontoSonrasiTutar * siparis.otv) / 100;
      siparis.genelToplam = siparis.iskontoSonrasiTutar + siparis.kdvTutar;
      siparis.satirSayisi = siparis.faturaHareketler.length;

      if (siparis.teslimatDurumu == 0) {
        siparis.teslimatDurumuString = 'Teslimat Yapılmadı';
      } else {
        siparis.teslimatDurumuString = 'Teslim Edildi';
      }
    });
  }

  get sortData() {
    return this.rowData.sort((a, b) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
    });
  }

  filterSideMenu() {
    var element = document.getElementById('filter_menu');
    element.classList.toggle('mystyle');
    this.onBtAdd();
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));

    return rowData;
  }

  satirTutar: any;
  iskontoTutar: any;
  iskontoSonrasiTutar: any;
  kdvTutar: any;
  satirOtv: any;
  genelToplam: any;
  selectedSiparisHareket: any;
  onCellValueChanged() {
    this.getAllRowData().forEach((item) => {
      item.toplamTutar = item.miktar * item.birimFiyat;
      item.iskontoTutar = (item.miktar * item.birimFiyat * item.iskonto) / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar = ((item.toplamTutar - item.iskontoTutar) * item.kdv) / 100;
    });
    this.satirTutar = this.getAllRowData().reduce(
      (prev: any, next: any) => prev + next.satirTutar,
      0
    );
    this.iskontoTutar = this.getAllRowData().reduce(
      (prev: any, next: any) => prev + next.iskontoTutar,
      0
    );
    this.kdvTutar = this.getAllRowData().reduce(
      (prev: any, next: any) => prev + next.kdvTutar,
      0
    );
    this.iskontoSonrasiTutar = this.satirTutar - this.iskontoTutar;
    this.genelToplam = this.iskontoSonrasiTutar + this.kdvTutar;

    const selectedRows = this.gridApi.getSelectedRows()[0];

    if (selectedRows != undefined) {
      this.selectedSiparisHareket = selectedRows;
      this.gridApi.applyTransaction({
        update: [selectedRows],
        addIndex: this.gridApi.getLastDisplayedRow() + 1,
      });
    }
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedSiparisHareket = selectedRows;
    // this.router.navigate(['/fatura/alis-faturasi/detail'], { state: selectedRows })
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/fatura/alis-fatura/detail'], {
      state: selectedRows,
    });
  }
  onBtAdd() {
    var selectedRows = this.gridApi.getSelectedNodes();

    this.gridApi.applyTransaction({
      add: [{ ad: 'Aaaaaaaaaaa' + Date.now() }],
      addIndex: this.gridApi.getLastDisplayedRow() + 1,
    });
  }

  delete() {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((event) => {
      if (event == true) {
        this.FaturaService.delete(this.selectedSiparisHareket.id, () => {
          this.getAllRow()
        });
      }
    });
    //
  }

 async getAllRow() {
    this.rowData =(await this.FaturaService.GetList(() => {})).items;
  }
}
