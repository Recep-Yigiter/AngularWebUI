import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { IrsaliyeService } from 'src/app/core/services/repository/irsaliye.service';

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
  // this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
  colDefs: ColDef[] = [
    { field: "createdDate", headerName: "Hareket Tarihi", width: 120, valueFormatter: params => this.DatePipe.transform(params.value, 'dd.MM.yyyy'), pinned: "left" },
    { field: "seri", headerName: "Seri", width: 70, pinned: "left" },
    { field: "belgeNo", headerName: "Belge No", width: 150, pinned: "left" },
    { field: "irsaliyeString", headerName: "Türü", width: 80, pinned: "left" },
    { field: "kdvTutar", headerName: "Kdv Tutarı", width: 100,cellRenderer: this.CurrencyCellRendererTR },
    { field: "satirOtv", headerName: "ÖTV Tutarı" ,width: 100,cellRenderer: this.CurrencyCellRendererTR},
    { field: "cariKodu", headerName: "Cari Kodu", width: 150 },
    { field: "cariAdi", headerName: "Cari Adı", width: 350 },
    { field: "referans", headerName: "Referans No", width: 150 },
    { field: "aciklama", headerName: "Açıklama" },
    { field: "satirSayisi", headerName: "Satır S.",width: 80 },
    { field: "referansNo", headerName: "Ref. No" },
    { field: "genelToplam", headerName: "Toplam Tutar", pinned: "right",cellRenderer: this.CurrencyCellRendererTR  },
  ];

  /**
   *
   */
  constructor(private IrsaliyeService: IrsaliyeService, private router: Router, private DatePipe: DatePipe) {


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
    this.rowData = (await this.IrsaliyeService.GetList(() => { })).items;

this.rowData=this.rowData.filter(c=>c.seri=="SI");
 this.rowData.sort((val1, val2)=> {return <any> new Date(val2.createdDate) - <any> new Date(val1.createdDate)})

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


    this.rowData.forEach((irsaliye) => {
      irsaliye.irsaliyeHareketler.forEach(irsaliyeHareket => {
        irsaliyeHareket.satirTutar = (irsaliyeHareket.miktar * irsaliyeHareket.birimFiyat);
        irsaliyeHareket.iskontoTutar = (irsaliyeHareket.satirTutar * irsaliyeHareket.iskonto) / 100;
        irsaliyeHareket.iskontoSonrasiTutar = (irsaliyeHareket.satirTutar) - irsaliyeHareket.iskontoTutar;
        irsaliyeHareket.kdvTutar = (irsaliyeHareket.iskontoSonrasiTutar) * Number(irsaliye.kdv) / 100;
        irsaliyeHareket.genelToplam = irsaliyeHareket.iskontoSonrasiTutar + irsaliyeHareket.kdvTutar
      });

      irsaliye.satirTutar = irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
      irsaliye.iskontoTutar =irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
      irsaliye.iskontoSonrasiTutar = irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
      irsaliye.kdvTutar = irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
      irsaliye.satirOtv = (irsaliye.iskontoSonrasiTutar * irsaliye.otv) / 100;
      irsaliye.genelToplam = irsaliye.iskontoSonrasiTutar + irsaliye.kdvTutar;
      irsaliye.satirSayisi=irsaliye.irsaliyeHareketler.length;

    })


  }

  get sortData() {
    return this.rowData.sort((a, b) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
    });
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
  selectedSiparisHareket: any;
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
      this.selectedSiparisHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

    }
  }

  onSelectionChanged() {

    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedSiparisHareket = selectedRows;

    // this.router.navigate(['/irsaliye/satis-irsaliyesi/detail'], { state: selectedRows })
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/irsaliye/satis-irsaliyesi/detail'], { state: selectedRows })
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