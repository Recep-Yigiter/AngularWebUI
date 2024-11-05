import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CariService } from 'src/app/core/services/repository/cari.service';

@Component({
  selector: 'app-detail-cari-hareketler',
  templateUrl: './detail-cari-hareketler.component.html',
  styleUrls: ['./detail-cari-hareketler.component.scss'],
  providers: [DatePipe],
})
export class DetailCariHareketlerComponent implements OnInit {

  BirimDataSource: any[]
  selectedBirim: any;
  selectedOption: any;
  rowData: any[];
  rowData2: any[];
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    { field: "createdDate", headerName: "Hareket Tar.",width: 100, valueFormatter: params => this.DatePipe.transform(params.value, 'dd.MM.yyyy') },
    { field: "faturaString", headerName: "Belge Türü", width: 100, },
    { field: "seri", headerName: "Seri", width: 80 },
    { field: "referans", headerName: "Referans",  },
    { field: "karsiHesap", headerName: "Karşı Hesap",  },
    { field: "borcTutari", headerName: "Borç Tutarı", cellRenderer: this.CurrencyCellRendererTR  },
    { field: "alacakTutari", headerName: "Alacak Tutarı", cellRenderer: this.CurrencyCellRendererTR  },
    { field: "yevmiyeFisNo", headerName: "Yev.Fiş.No",  },
    { field: "aciklama", headerName: "Açıklama",  },

  ];


  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }


  constructor(
    private DatePipe: DatePipe,
    private CariService: CariService,
    private router: Router
  ) {
    this.stateData = history.state


  }

  stateData: any;
  Cari: any;
  async ngOnInit() {
    this.stateControl();

  }





  async stateControl() {



    if (this.stateData?.id) {

      this.rowData = this.stateData.faturalar;
      this.rowData.forEach((item) => {
        item.faturaTuru = item.faturaString


        item.faturaHareketler.forEach(faturaHareket => {
          faturaHareket.satirTutar = (faturaHareket.miktar * faturaHareket.birimFiyat);
          faturaHareket.iskontoTutar = (faturaHareket.satirTutar * faturaHareket.iskonto) / 100;
          faturaHareket.iskontoSonrasiTutar = (faturaHareket.satirTutar) - faturaHareket.iskontoTutar;
          faturaHareket.kdvTutar = (faturaHareket.iskontoSonrasiTutar) * Number(item.kdv) / 100;
          faturaHareket.genelToplam = faturaHareket.iskontoSonrasiTutar + faturaHareket.kdvTutar
        });
        item.satirTutar = item.faturaHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
        item.iskontoTutar =item.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
        item.iskontoSonrasiTutar = item.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
        item.kdvTutar = item.faturaHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
        item.satirOtv = (item.iskontoSonrasiTutar * item.otv) / 100;
        item.genelToplam = item.iskontoSonrasiTutar + item.kdvTutar;
        item.satirSayisi=item.faturaHareketler.length;





        item.alacakTutari = item.faturaTuru=="Alis"? item.genelToplam:0;
        item.borcTutari =item.faturaTuru=="Satis"? item.genelToplam:0;;

      })

      console.log(this.stateData.faturalar);
    }
    else {
      this.Cari = (await this.CariService.getByHourId(this.stateData.hourId, () => { }));
      this.rowData = this.Cari.faturaHareketler;

    }


  }

  async islemler() {
    if (this.stateData?.id) {

      this.router.navigate(['/menu/finans/cari/detail'], { state: history.state })

    }
    else {

      this.Cari = (await this.CariService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/menu/finans/cari/detail'], { state: this.Cari })

    }

  }









}
