import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent, CellClassParams, } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { KasaService } from 'src/app/core/services/repository/kasa.service';
import { BankaHesapService } from 'src/app/core/services/repository/banka-hesap.service';
import { BankaHesapHareketlerComponent } from '../core/components/banka-hesap-hareketler/banka-hesap-hareketler.component';


@Component({
  selector: 'app-list-banka-hesap',
  templateUrl: './list-banka-hesap.component.html',
  styleUrls: ['./list-banka-hesap.component.scss']
})
export class ListBankaHesapComponent implements OnInit {


  
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private BankaHesapService: BankaHesapService, private NgbModal: NgbModal) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [

    { field: 'hesapNo', width: 100,   },
    { field: 'hesapAdi', width: 200,   },
    { field: 'borc', width: 100,cellStyle: params => {
      if (params.value === 0) {
          //mark police cells as red #009732
          return {color: '#666666',};
      }
      return {color: 'red',};;
  }, cellRenderer: this.CurrencyCellRendererTR,  },
   
  
  { field: 'alacak', width: 100,cellStyle: params => {
      if (params.value === 0) {
          //mark police cells as red #009732
          return {color: '#666666',};
      }
      return {color: '#009732',};;
  }, cellRenderer: this.CurrencyCellRendererTR,  },
    
  { field: 'borcBakiye', width: 100,cellStyle: params => {
      if (params.value === 0) {
          //mark police cells as red #009732
          return {color: '#666666',};
      }
      return {color: 'red',};;
  }, cellRenderer: this.CurrencyCellRendererTR,  },

  { field: 'alacakBakiye', width: 100,cellStyle: params => {
      if (params.value === 0) {
          //mark police cells as red #009732
          return {color: '#666666',};
      }
      return {color: '#009732',};;
  }, cellRenderer: this.CurrencyCellRendererTR,  },
    
    
  ];

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (
      await this.BankaHesapService.GetList(
        () => {},
        (errorMessage) => {
          console.log('Hata....', errorMessage.error);
        }
      )
    ).items;

    this.rowData.forEach((item) => {
      item.bakiye = item.alacak - item.borc;
    });

   
  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(BankaHesapHareketlerComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRow;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }





  async refresh() {
    window.location.reload();
  }


  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }
}


