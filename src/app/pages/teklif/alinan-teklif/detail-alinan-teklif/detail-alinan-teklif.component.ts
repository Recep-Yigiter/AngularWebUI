import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { DepoService } from 'src/app/pages/stok/depo/core/services/depo.service';
import { TeklifService } from 'src/app/core/services/repository/teklif.service';

@Component({
  selector: 'app-detail-alinan-teklif',
  templateUrl: './detail-alinan-teklif.component.html',
  styleUrls: ['./detail-alinan-teklif.component.scss'],
  providers: [DatePipe],
})
export class DetailAlinanTeklifComponent implements OnInit {
  /**
   *
   */
  stateData: any;
  constructor(private router: Router, private TeklifService: TeklifService, private DatePipe: DatePipe, private DepoService: DepoService) {
    this.stateData = history.state

  }
  dateTime: any = new Date();
  dateTimeOpsiyon: any = new Date();

  time: any = new Date();
  rxTime: any = new Date();
  ngOnInit(): void {
    this.stateControl();

  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));

    return rowData;
  }

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any;
  rowData: any[];

  colDefs: ColDef[] = [
    { field: "teklifHareketTuruAdi", headerName: "S/H/M", width: 100, },
    { field: "stokKodu", headerName: "Stok Kodu", width: 150 },
    { field: "stokAdi", headerName: "Stok Adı", width: 350, },
    { field: "miktar", width: 90, type: 'rightAligned', cellRenderer: this.CurrencyCellRendererTR },
    { field: "birimAdi", headerName: "Birim", type: 'rightAligned', width: 80, },
    { field: "birimFiyat", width: 100, type: 'rightAligned', cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskonto", headerName: "isk.(%)", type: 'rightAligned', width: 80, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
    { field: "iskontoTutar", type: 'rightAligned', headerName: "isk. Tutarı", width: 120, cellRenderer: this.CurrencyCellRendererTR },
    { field: "aciklama", headerName: "Açıklama", width: 200, },
    { field: "satirTutar", type: 'rightAligned', width: 120, headerName: "Toplam Tutar", cellRenderer: this.CurrencyCellRendererTR },



  ];

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }

  teklif: any;
  selectedObject: any;
  teklifAktarbuttonDisable: boolean = false;
  async stateControl() {


    this.teklif = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { })).data;


    this.teklif.satirSayisi = this.teklif.teklifHareketler.length;
    this.teklif.teklifHareketler.forEach((teklifHareket, index) => {
      teklifHareket.satirTutar = (teklifHareket.miktar * teklifHareket.birimFiyat);
      teklifHareket.iskontoTutar = (teklifHareket.satirTutar * teklifHareket.iskonto) / 100;
      teklifHareket.iskontoSonrasiTutar = (teklifHareket.satirTutar) - teklifHareket.iskontoTutar;
      teklifHareket.kdvTutar = (teklifHareket.iskontoSonrasiTutar) * Number(this.teklif.kdv) / 100;
      teklifHareket.genelToplam = teklifHareket.iskontoSonrasiTutar + teklifHareket.kdvTutar

    })
    this.teklif.satirTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.teklif.iskontoTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.teklif.iskontoSonrasiTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.teklif.kdvTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.teklif.satirOtv = (this.teklif.iskontoSonrasiTutar * this.teklif.otv) / 100;
    this.teklif.genelToplam = this.teklif.iskontoSonrasiTutar + this.teklif.kdvTutar

    this.rowData = this.teklif.teklifHareketler;

    this.stateData = this.teklif;
    this.dateTime = this.DatePipe.transform(this.teklif.createdDate, 'yyyy-MM-dd');
    this.dateTimeOpsiyon = this.DatePipe.transform(this.teklif.opsiyonTarihi, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.teklif.createdDate, 'hh : mm ');

    if (this.stateData.durum == 'Kapalı') {
      this.teklifAktarbuttonDisable = true;
    }
  }
  vazgec() {
    this.router.navigate(['/pages/teklif/alinan-teklif'], { state: this.stateData })
  }
  async duzenle() {

    if (this.stateData?.id) {
      this.router.navigate(['/pages/teklif/update-alinan-teklif'], { state: this.stateData })
    }
    else {
      this.teklif = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { })).data

      this.router.navigate(['/pages/teklif/update-alinan-teklif'], { state: this.teklif })
    }
  }

}


function currencyFormatter(currency, sign) {

  var sansDec = currency.toFixed(2);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + `${formatted}`;
}
function stringFormatter(params) {
  var fruit = params.value;
  var firstChar = fruit.slice(0, 1).toUpperCase();
  return firstChar + fruit.slice(1);
}
