import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { DepoService } from 'src/app/pages/stok/depo/core/services/depo.service';
import { FaturaService } from '../core/services/fatura.service';
@Component({
  selector: 'app-detail-satis-fatura',
  templateUrl: './detail-satis-fatura.component.html',
  styleUrls: ['./detail-satis-fatura.component.scss']
})
export class DetailSatisFaturaComponent implements OnInit {
  /**
   *
   */
  stateData: any;
  constructor(private router: Router, private FaturaService: FaturaService, private DatePipe: DatePipe, private DepoService: DepoService) {
    this.stateData = history.state

  }
  dateTime: any = new Date();

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
    { field: "faturaHareketTuruAdi", headerName: "S/H/M", width: 100, },
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

  fatura: any;
  selectedObject: any;
  async stateControl() {


    this.fatura = (await this.FaturaService.getByHourId(this.stateData.hourId, () => { })).data;

    const depoList = (await this.DepoService.GetList(() => { })).data.items;

    if (this.stateData.depoId != undefined) {
      this.selectedObject = depoList.find((el: any) => {

        return el?.id == this.stateData.depoId;
      });
    }
    this.fatura.depoAdi = this.selectedObject.ad;
    this.fatura.depoKodu = this.selectedObject.kod;
    this.fatura.depoId = this.selectedObject.id;
    this.fatura.satirSayisi = this.fatura.faturaHareketler.length;
    this.fatura.faturaHareketler.forEach((faturaHareket, index) => {
      faturaHareket.satirTutar = (faturaHareket.miktar * faturaHareket.birimFiyat);
      faturaHareket.iskontoTutar = (faturaHareket.satirTutar * faturaHareket.iskonto) / 100;
      faturaHareket.iskontoSonrasiTutar = (faturaHareket.satirTutar) - faturaHareket.iskontoTutar;
      faturaHareket.kdvTutar = (faturaHareket.iskontoSonrasiTutar) * Number(this.fatura.kdv) / 100;
      faturaHareket.genelToplam = faturaHareket.iskontoSonrasiTutar + faturaHareket.kdvTutar

    })
    this.fatura.satirTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.fatura.iskontoTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.fatura.iskontoSonrasiTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.fatura.kdvTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.fatura.satirOtv = (this.fatura.iskontoSonrasiTutar * this.fatura.otv) / 100;
    this.fatura.genelToplam = this.fatura.iskontoSonrasiTutar + this.fatura.kdvTutar

    this.rowData = this.fatura.faturaHareketler;

    this.stateData = this.fatura;
    this.dateTime = this.DatePipe.transform(this.fatura.createdDate, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.fatura.createdDate, 'hh : mm ')

  }
  async duzenle() {

    if (this.stateData?.id) {
      this.router.navigate(['/pages/fatura/update-fatura'], { state: this.stateData })
    }
    else {
      this.fatura = (await this.FaturaService.getByHourId(this.stateData.hourId, () => { })).data

      this.router.navigate(['/pages/fatura/update-fatura'], { state: this.fatura })
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
