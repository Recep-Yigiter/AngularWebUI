import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrunReceteService } from 'src/app/pages/uretim/urun-recete/core/services/urun-recete.service';
import { DepoService } from '../../depo/core/services/depo.service';
import { StokService } from '../core/services/stok.service';

@Component({
  selector: 'app-detail-stok-actions',
  templateUrl: './detail-stok-actions.component.html',
  styleUrls: ['./detail-stok-actions.component.scss']
})
export class DetailStokActionsComponent implements OnInit {

  BirimDataSource: any[]
  selectedBirim: any;
  selectedOption: any;
  rowDataDepoToplam: any[];
  rowDataIslemler: any[];
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;



  colDepoToplam: ColDef[] = [

    { field: "depoKodu", headerName: "Depo Kodu", width: 150 },
    { field: "depoAdi", headerName: "Depo Adı", },
    { field: "giren", width: 100, headerName: "Giren", type: 'rightAligned', valueFormatter: params => params.data.giren.toFixed(2) },
    { field: "cikan", width: 100, headerName: "Çıkan", type: 'rightAligned', valueFormatter: params => params.data.cikan.toFixed(2) },
    { field: "mevcut", width: 100, headerName: "Mevcut", type: 'rightAligned',  valueFormatter: params => params.data.mevcut.toFixed(2)},
  ];

  colIslemler: ColDef[] = [

    { field: "faturaTuru", headerName: "F. Türü", width: 80 },
    { field: "depoKodu", headerName: "Depo Kodu", width: 150 },
    {
      field: "depoAdi", headerName: "Depo Adı", width: 150, filterParams: {
        valueFormatter: stringFormatter
      }
    },
    { field: "miktar", width: 100, type: 'rightAligned', valueFormatter: params => params.data.miktar.toFixed(2) },
    { field: "birimAdi", width: 100 },
    { field: "birimFiyat", width: 100, valueFormatter: params => currencyFormatter(params.data.birimFiyat, "₺ "), },
    { field: "cariKodu", width: 100,  },
    { field: "cariAdi", },
  
  ];



  constructor(



    private StokService: StokService,
    private router: Router
  ) {

    this.stateData = history.state


  }

  stateData: any;
  Stok: any;
  async ngOnInit() {

    this.stateControl();
  
  }





  async stateControl() {

    if (this.stateData?.id) {

      this.rowDataIslemler = this.stateData.faturaHareketler;
    
      this.rowDataIslemler.forEach((item) => {
        item.faturaTuru = item.fatura.faturaString;
        item.cariAdi = item.fatura.cariAdi;
        item.cariKodu = item.fatura.cariKodu;

      })
      this.stateData.faturaHareketler.forEach(element => {
        if (element.faturaTuru == "Alis") {
          element.giren = element.miktar
        }
        else {
          element.cikan = element.miktar
        }
      });




      const result = this.stateData.faturaHareketler
        .map((item, i, array) => {
          const defaultValue = {
            faturaHareketTuru: item.faturaHareketTuru,
            faturaHareketTuruAdi: item.faturaHareketTuruAdi,
            depoKodu: item.depoKodu,
            depoAdi: item.depoAdi,
            giren: 0,
            cikan: 0
          }
          const finalValue = array
            .filter(other => other.depoAdi === item.depoAdi)
            .reduce((accum, currentVal) => {
              accum.giren += currentVal.giren;
              accum.cikan += currentVal.cikan;
              return accum;
            }, defaultValue);

          return finalValue;
        })
        .filter((item, thisIndex, array) => {
          const index = array.findIndex((otherItem, otherIndex) => otherItem.depoAdi === item.depoAdi && otherIndex !== thisIndex && otherIndex > thisIndex);

          return index === -1
        })
      this.rowDataDepoToplam = result;
      this.rowDataDepoToplam.forEach((item) => {
        item.mevcut = item.giren - item.cikan
      })

    }
    else {

      this.Stok = (await this.StokService.getByHourId(this.stateData.hourId, () => { })).data;
      this.rowDataIslemler = this.Stok.faturaHareketler;
      const result = this.Stok.faturaHareketler
        .map((item, i, array) => {
          const defaultValue = {
            faturaHareketTuru: item.faturaHareketTuru,
            faturaHareketTuruAdi: item.faturaHareketTuruAdi,
            depoKodu: item.depoKodu,
            depoAdi: item.depoAdi,
            giren: 0,
            cikan: 0
          }
          const finalValue = array
            .filter(other => other.depoAdi === item.depoAdi)
            .reduce((accum, currentVal) => {
              accum.giren += currentVal.giren;
              accum.cikan += currentVal.cikan;
              return accum;
            }, defaultValue);

          return finalValue;
        })
        .filter((item, thisIndex, array) => {
          const index = array.findIndex((otherItem, otherIndex) => otherItem.depoAdi === item.depoAdi && otherIndex !== thisIndex && otherIndex > thisIndex);

          return index === -1
        })
      this.rowDataDepoToplam = result;

    }
  }


  titleRouter(){
    if (this.stateData?.id) {
      this.router.navigate(['/pages/stok/detail-stok'], { state: this.stateData })
    } else {
      this.router.navigate(['/pages/stok/detail-stok'], { state: this.Stok })
    }
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