import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { TeklifService } from './core/services/teklif.service';

@Component({
  selector: 'app-verilen-teklif',
  templateUrl: './verilen-teklif.component.html',
  styleUrls: ['./verilen-teklif.component.scss'],
  providers: [DatePipe],
})
export class VerilenTeklifComponent implements OnInit {

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  // this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
  colDefs: ColDef[] = [
    { field: "createdDate", headerName: "Hareket Tarihi", width: 120, valueFormatter: params => this.DatePipe.transform(params.value, 'yyyy / MM / dd'), pinned: "left" },
    { field: "seri", headerName: "Belge Seri", width: 100, pinned: "left" },
    { field: "belgeNo", headerName: "Belge No", width: 150, pinned: "left" },
    { field: "teklifTuruAdi", headerName: "Hareket Türü", width: 120, pinned: "left" },
    { field: "kdvTutar", headerName: "Kdv Tutarı",cellRenderer: this.CurrencyCellRendererTR },
    { field: "satirOtv", headerName: "ÖTV Tutarı" ,cellRenderer: this.CurrencyCellRendererTR},
    { field: "cariKodu", headerName: "Cari Kodu", width: 150 },
    { field: "cariAdi", headerName: "Cari Adı", width: 350 },
    { field: "referans", headerName: "Referans No", width: 150 },
    { field: "durum", headerName: "Onay Durumu", width: 150 },
    { field: "teklifAlanPersonel", headerName: "Teklif Alan Personel" },
    { field: "opsiyonTarihi", headerName: "Opsiyon Tarihi", width: 150 },
    { field: "aciklama", headerName: "Açıklama" },
    { field: "satirSayisi", headerName: "Satır S.",width: 80 },
    { field: "referansNo", headerName: "Ref. No" },
    { field: "genelToplam", headerName: "Toplam Tutar", pinned: "right",cellRenderer: this.CurrencyCellRendererTR  },
  ];

  /**
   *
   */
  constructor(private StokService: TeklifService, private router: Router, private DatePipe: DatePipe) {


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
    this.rowData = (await this.StokService.GetList(() => { })).data.items;


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


    this.rowData.forEach((teklif) => {
      teklif.teklifHareketler.forEach(teklifHareket => {
        teklifHareket.satirTutar = (teklifHareket.miktar * teklifHareket.birimFiyat);
        teklifHareket.iskontoTutar = (teklifHareket.satirTutar * teklifHareket.iskonto) / 100;
        teklifHareket.iskontoSonrasiTutar = (teklifHareket.satirTutar) - teklifHareket.iskontoTutar;
        teklifHareket.kdvTutar = (teklifHareket.iskontoSonrasiTutar) * Number(teklif.kdv) / 100;
        teklifHareket.genelToplam = teklifHareket.iskontoSonrasiTutar + teklifHareket.kdvTutar
      });

      teklif.satirTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
      teklif.iskontoTutar =teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
      teklif.iskontoSonrasiTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
      teklif.kdvTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
      teklif.satirOtv = (teklif.iskontoSonrasiTutar * teklif.otv) / 100;
      teklif.genelToplam = teklif.iskontoSonrasiTutar + teklif.kdvTutar;
      teklif.satirSayisi=teklif.teklifHareketler.length
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
  selectedTeklifHareket: any;
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
      this.selectedTeklifHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

    }
  }

  onSelectionChanged() {

    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedTeklifHareket = selectedRows
    this.router.navigate(['/pages/satin-alma/detail-alinan-teklif'], { state: selectedRows })
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