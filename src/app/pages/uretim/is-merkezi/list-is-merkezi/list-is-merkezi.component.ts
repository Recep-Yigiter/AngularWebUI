import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';

@Component({
  selector: 'app-list-is-merkezi',
  templateUrl: './list-is-merkezi.component.html',
  styleUrls: ['./list-is-merkezi.component.scss'],
  providers: [DatePipe],
})
export class ListIsMerkeziComponent implements OnInit {

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  // this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
  colDefs: ColDef[] = [
    { field: "ad",headerName:"İş Merkezi Adi", },
    { field: "kod",headerName:"İş Merkezi Kodu"},
    { field: "zamanVerimlilik",headerName:"Zaman Verimlilik"},
    { field: "kapasite",headerName:"Kapasite" },
    { field: "kurulumZamani",headerName:'Kurulum Zamanı' },
    { field: "temizlikZamani",headerName:'Temizlik Zamanı' },
    { field: "saatBasinaMaliyet",headerName:'Saat Başına Maliyet' },
    { field: "aciklama",headerName:'Acıklama' },

  ];

  /**
   *
   */
  constructor(private StokService: SiparisService, private router: Router, private DatePipe: DatePipe) {


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
    this.rowData = this.rowData.filter(c => c.seri == "AS");
    this.rowData.sort((val1, val2) => { return <any>new Date(val2.createdDate) - <any>new Date(val1.createdDate) })

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


    this.rowData.forEach((siparis) => {
      siparis.siparisHareketler.forEach(siparisHareket => {
        siparisHareket.satirTutar = (siparisHareket.miktar * siparisHareket.birimFiyat);
        siparisHareket.iskontoTutar = (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
        siparisHareket.iskontoSonrasiTutar = (siparisHareket.satirTutar) - siparisHareket.iskontoTutar;
        siparisHareket.kdvTutar = (siparisHareket.iskontoSonrasiTutar) * Number(siparis.kdv) / 100;
        siparisHareket.genelToplam = siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar
      });

      siparis.satirTutar = siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
      siparis.iskontoTutar = siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
      siparis.iskontoSonrasiTutar = siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
      siparis.kdvTutar = siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
      siparis.satirOtv = (siparis.iskontoSonrasiTutar * siparis.otv) / 100;
      siparis.genelToplam = siparis.iskontoSonrasiTutar + siparis.kdvTutar;
      siparis.satirSayisi = siparis.siparisHareketler.length;

      if (siparis.teslimatDurumu == 0) {
        siparis.teslimatDurumuString = "Teslimat Yapılmadı"
      } else {
        siparis.teslimatDurumuString = "Teslim Edildi"
      }
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
    this.selectedSiparisHareket = selectedRows
    // this.router.navigate(['/satis/alinan-siparis/detail'], { state: selectedRows })
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/satis/alinan-siparis/detail'], { state: selectedRows })
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