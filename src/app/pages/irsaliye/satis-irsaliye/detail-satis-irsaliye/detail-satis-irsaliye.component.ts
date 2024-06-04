import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { IrsaliyeService } from 'src/app/core/services/repository/irsaliye.service';
import { DepoService } from 'src/app/core/services/repository/depo.service';
@Component({
  selector: 'app-detail-satis-irsaliye',
  templateUrl: './detail-satis-irsaliye.component.html',
  styleUrls: ['./detail-satis-irsaliye.component.scss'],
  providers: [ DatePipe],
})
export class DetailSatisIrsaliyeComponent implements OnInit {
  /**
   *
   */
  stateData: any;
  constructor(private router: Router, private IrsaliyeService: IrsaliyeService, private DatePipe: DatePipe, private DepoService: DepoService) {
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
    { field: "irsaliyeHareketTuruAdi", headerName: "S/H/M", width: 100, },
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

  Irsaliye: any;
  selectedObject: any;
  async stateControl() {


    this.Irsaliye = (await this.IrsaliyeService.getByHourId(this.stateData.hourId, () => { }));

    const depoList = (await this.DepoService.GetList(() => { })).items;

    if (this.stateData.depoId != undefined) {
      this.selectedObject = depoList.find((el: any) => {
        return el?.id == this.stateData.depoId;
      });
    }

    this.Irsaliye.satirSayisi = this.Irsaliye.irsaliyeHareketler.length;
    this.Irsaliye.irsaliyeHareketler.forEach((IrsaliyeHareket, index) => {
      IrsaliyeHareket.satirTutar = (IrsaliyeHareket.miktar * IrsaliyeHareket.birimFiyat);
      IrsaliyeHareket.iskontoTutar = (IrsaliyeHareket.satirTutar * IrsaliyeHareket.iskonto) / 100;
      IrsaliyeHareket.iskontoSonrasiTutar = (IrsaliyeHareket.satirTutar) - IrsaliyeHareket.iskontoTutar;
      IrsaliyeHareket.kdvTutar = (IrsaliyeHareket.iskontoSonrasiTutar) * Number(this.Irsaliye.kdv) / 100;
      IrsaliyeHareket.genelToplam = IrsaliyeHareket.iskontoSonrasiTutar + IrsaliyeHareket.kdvTutar

    })
    this.Irsaliye.satirTutar = this.Irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.Irsaliye.iskontoTutar = this.Irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.Irsaliye.iskontoSonrasiTutar = this.Irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.Irsaliye.kdvTutar = this.Irsaliye.irsaliyeHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.Irsaliye.satirOtv = (this.Irsaliye.iskontoSonrasiTutar * this.Irsaliye.otv) / 100;
    this.Irsaliye.genelToplam = this.Irsaliye.iskontoSonrasiTutar + this.Irsaliye.kdvTutar

    this.rowData = this.Irsaliye.irsaliyeHareketler;

    this.stateData = this.Irsaliye;
    this.dateTime = this.DatePipe.transform(this.Irsaliye.createdDate, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.Irsaliye.createdDate, 'hh : mm ')

  }
  vazgec(){
    this.router.navigate(['/irsaliye/satis-irsaliyesi'],)
  }
  async duzenle() {

    if (this.stateData?.id) {
      this.router.navigate(['/irsaliye/satis-irsaliyesi/update'], { state: this.stateData })
    }
    else {
      this.Irsaliye = (await this.IrsaliyeService.getByHourId(this.stateData.hourId, () => { }))

      this.router.navigate(['/irsaliye/satis-irsaliyesi/update'], { state: this.Irsaliye })
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
