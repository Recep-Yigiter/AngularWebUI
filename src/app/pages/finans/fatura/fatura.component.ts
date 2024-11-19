import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { FaturaService } from 'src/app/core/services/repository/fatura.service';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss'],
  providers: [DatePipe],
})
export class FaturaComponent implements OnInit {

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  // this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
  colDefs: ColDef[] = [
    { field: "createdDate", headerName: "Hareket Tarihi", width: 120, valueFormatter: params => this.DatePipe.transform(params.value, 'yyyy / MM / dd'), pinned: "left" },
    { field: "faturaString", headerName: "Hareket Türü", width: 120, pinned: "left" },
    { field: "seri", headerName: "Belge Seri", width: 100, pinned: "left" },
    { field: "belgeNo", headerName: "Belge No", width: 150, pinned: "left" },
    { field: "referans", headerName: "Referans No", width: 150 },
    { field: "cariKodu", headerName: "Cari Kodu", width: 150 },
    { field: "cariAdi", headerName: "Cari Adı", width: 350 },
    { field: "faturaNo", headerName: "Fatura No" },
    { field: "aciklama", headerName: "Açıklama" },
    { field: "eFatura", headerName: "E-Fatura Durumu" },
    { field: "eArsiv", headerName: "E-Arşiv Durumu" },
    { field: "satirSayisi", headerName: "Satır S." },
    { field: "satirOtv", headerName: "Toplam ÖTV" ,cellRenderer: this.CurrencyCellRendererTR},
    { field: "kdvTutar", headerName: "Toplam KDV",cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskontoSonrasiTutar", headerName: "İsk. Sonrası Tut." ,cellRenderer: this.CurrencyCellRendererTR},
    { field: "iskontoTutar", headerName: "Toplam isk.",cellRenderer: this.CurrencyCellRendererTR },
    { field: "createdDate", headerName: "Saati", width: 100, valueFormatter: params => this.DatePipe.transform(params.value, 'hh : mm') },
    { field: "birimAdi", headerName: "E-İrsaliye No" },
    { field: "birimAdi", headerName: "Fatura Seri", width: 100  },
    { field: "depoKodu", headerName: "Depo Kodu", width: 150 },
    { field: "depoAdi", headerName: "Depo Adı", width: 250 },
    { field: "genelToplam", headerName: "Toplam Tutar", pinned: "right",cellRenderer: this.CurrencyCellRendererTR  },
  ];

  /**
   *
   */
  constructor(private StokService: FaturaService, private router: Router, private DatePipe: DatePipe) {


  }
  ngOnInit(): void {

  }

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  rowDataCount: any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.StokService.GetList(() => { })).items;

    this.rowData.forEach((fatura) => {
      fatura.depoId = fatura.faturaHareketler[0].depoId;
      fatura.depoAdi = fatura.faturaHareketler[0].depoAdi;
      fatura.depoKodu = fatura.faturaHareketler[0].depoKodu;

    })
    this.rowData.forEach((rowData) => {
      const dateParts = rowData.createdDate.split("/");
      return {
        ...rowData,
        createdDate: `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
        dateObject: new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0]),
        ),

      }
    })

    this.rowDataCount = this.rowData.length;


    this.rowData.forEach((fatura) => {
      fatura.faturaHareketler.forEach(faturaHareket => {
        faturaHareket.satirTutar = (faturaHareket.miktar * faturaHareket.birimFiyat);
        faturaHareket.iskontoTutar = (faturaHareket.satirTutar * faturaHareket.iskonto) / 100;
        faturaHareket.iskontoSonrasiTutar = (faturaHareket.satirTutar) - faturaHareket.iskontoTutar;
        faturaHareket.kdvTutar = (faturaHareket.iskontoSonrasiTutar) * Number(fatura.kdv) / 100;
        faturaHareket.genelToplam = faturaHareket.iskontoSonrasiTutar + faturaHareket.kdvTutar
      });

      fatura.satirTutar = fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
      fatura.iskontoTutar =fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
      fatura.iskontoSonrasiTutar = fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
      fatura.kdvTutar = fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
      fatura.satirOtv = (fatura.iskontoSonrasiTutar * fatura.otv) / 100;
      fatura.genelToplam = fatura.iskontoSonrasiTutar + fatura.kdvTutar
    })


  }


  filterSideMenu() {
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
    this.onBtAdd()
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));

    return rowData;
  }

  satirTutar: any;
  iskontoTutar: any;
  iskontoSonrasiTutar: any;
  kdvTutar: any;
  satirOtv: any;
  genelToplam: any;
  selectedFaturaHareket: any;
  onCellValueChanged() {
    this.getAllRowData().forEach((item) => {
      item.toplamTutar = (item.miktar * item.birimFiyat);
      item.iskontoTutar = (item.miktar * item.birimFiyat) * item.iskonto / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar = (item.toplamTutar - item.iskontoTutar) * item.kdv / 100;
    })
    this.satirTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.satirTutar, 0);
    this.iskontoTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.kdvTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.kdvTutar, 0)
    this.iskontoSonrasiTutar = this.satirTutar - this.iskontoTutar
    this.genelToplam = this.iskontoSonrasiTutar + this.kdvTutar;

    const selectedRows = this.gridApi.getSelectedRows()[0];

    if (selectedRows != undefined) {
      this.selectedFaturaHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

    }
  }

  onSelectionChanged() {

    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedFaturaHareket = selectedRows
    if (selectedRows.seri=="AF") {
      this.router.navigate(['/pages/fatura/detail-alis-fatura'], { state: selectedRows })
    } else {
      this.router.navigate(['/pages/fatura/detail-satis-fatura'], { state: selectedRows })
    }

  }

  onBtAdd() {
    var selectedRows = this.gridApi.getSelectedNodes();

    this.gridApi.applyTransaction({ add: [{ ad: "Aaaaaaaaaaa" + Date.now() }], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
  }
}


function currencyFormatter(currency, sign) {
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + `${formatted}`;
}
function stringFormatter(params) {
  var fruit = params.value;
  var firstChar = fruit.slice(0, 1).toUpperCase();
  return firstChar + fruit.slice(1);
}