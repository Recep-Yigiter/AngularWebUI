import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';

@Component({
  selector: 'app-detail-alinan-siparis',
  templateUrl: './detail-alinan-siparis.component.html',
  styleUrls: ['./detail-alinan-siparis.component.scss'],
  providers: [ DatePipe],
})
export class DetailAlinanSiparisComponent implements OnInit {
  /**
   *
   */
  stateData: any;
  constructor(private router: Router, private SiparisService: SiparisService, private DatePipe: DatePipe) {
    this.stateData = history.state

  }
  dateTime: any = new Date();
  dateTimeTeslimTarihi: any = new Date();

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
    { field: "siparisHareketTuruAdi", headerName: "S/H/M", width: 100, },
    { field: "stokKodu", headerName: "Stok Kodu", width: 150 },
    { field: "stokAdi", headerName: "Stok Adı", width: 350, },
    { field: "miktar", width: 90, type: 'rightAligned', cellRenderer: this.CurrencyCellRendererTR },
    { field: "birimAdi", headerName: "Birim", type: 'rightAligned', width: 80, },
    { field: "birimFiyat", width: 100, type: 'rightAligned', cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskonto", headerName: "isk.(%)", type: 'rightAligned', width: 80, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
    { field: "iskontoTutar", type: 'rightAligned', headerName: "isk. Tutarı", width: 120, cellRenderer: this.CurrencyCellRendererTR },
    { field: "aciklama", headerName: "Açıklama", width: 200, },
    { field: "satirTutar",type: 'rightAligned', width: 120, headerName: "Toplam Tutar", cellRenderer: this.CurrencyCellRendererTR },



  ];

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }

  siparis: any;
  selectedObject: any;
  async stateControl() {

    this.siparis = (await this.SiparisService.getByHourId(this.stateData.hourId, () => { }));


    this.siparis.satirSayisi = this.siparis.siparisHareketler.length;
    this.siparis.siparisHareketler.forEach((siparisHareket, index) => {
      siparisHareket.satirTutar = (siparisHareket.miktar * siparisHareket.birimFiyat);
      siparisHareket.iskontoTutar = (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
      siparisHareket.iskontoSonrasiTutar = (siparisHareket.satirTutar) - siparisHareket.iskontoTutar;
      siparisHareket.kdvTutar = (siparisHareket.iskontoSonrasiTutar) * Number(this.siparis.kdv) / 100;
      siparisHareket.genelToplam = siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar
    })
    this.siparis.satirTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.siparis.iskontoTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.siparis.iskontoSonrasiTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.siparis.kdvTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.siparis.satirOtv = (this.siparis.iskontoSonrasiTutar * this.siparis.otv) / 100;
    this.siparis.genelToplam = this.siparis.iskontoSonrasiTutar + this.siparis.kdvTutar

    this.rowData = this.siparis.siparisHareketler;

    this.stateData = this.siparis;
    this.dateTime = this.DatePipe.transform(this.siparis.createdDate, 'yyyy-MM-dd');
    this.dateTimeTeslimTarihi = this.DatePipe.transform(this.siparis.teslimTarihi, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.siparis.createdDate, 'hh : mm ')


  }
  vazgec(){
    this.router.navigate(['/menu/satis/alinan-siparis'])
  }
  async duzenle() {

    if (this.stateData?.id) {
      this.router.navigate(['/menu/satis/alinan-siparis/update'], { state: this.stateData })
    }
    else {
      this.siparis = (await this.SiparisService.getByHourId(this.stateData.hourId, () => { }))

      this.router.navigate(['/menu/satis/alinan-siparis/update'], { state: this.siparis })
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

