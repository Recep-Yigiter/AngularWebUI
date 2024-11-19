import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellClassParams,
} from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';
import { BankaHesapHareketService } from 'src/app/core/services/repository/banka-hesap-hareket.service';
import { CreateBankaHesapModalComponent } from '../../../create-banka-hesap-modal/create-banka-hesap-modal.component';

@Component({
  selector: 'app-banka-hesap-hareketler',
  templateUrl: './banka-hesap-hareketler.component.html',
  styleUrls: ['./banka-hesap-hareketler.component.scss'],
  providers:[DatePipe]
})
export class BankaHesapHareketlerComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private BankaHesapHareketService: BankaHesapHareketService, private NgbModal: NgbModal,private DatePipe:DatePipe) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    {
      field: 'islemTarihi',
      headerName: 'İşlem Tarihi',
      width: 100,

      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    {
      field: 'seriNo',
      maxWidth: 70,
      headerName: 'Seri',
    },
    {
      field: 'islemAdi',
      headerName: 'Belge Türü',
      width: 200,
    },
    {
      field: 'bankaAdi',
      headerName: 'Banka',
      width: 100,
    },
    {
      field: 'bankaHesapNo',
      headerName: 'Hesap Kodu',
      width: 100,
    },
    {
      field: 'bankaHesapAdi',
      headerName: 'Hesap Adı',
      width: 250,
    },

  
  
  
  
  
    {
      field: 'karsiHesap',
      headerName: 'Karşı Hesap',
      width: 100,
    },
    {
      field: 'karsiHesapKodu',
      headerName: 'Karşı Hesap Kodu',
      width: 120,
    },
    {
      field: 'karsiHesapAdi',
      headerName: 'Karşı Hesap Adı',
      width: 200,
    },
    {
      field: 'borc',
      headerName: 'Borç',
      width: 100,

      cellRenderer: this.CurrencyCellRendererTR,
    },
    {
      field: 'alacak',
      headerName: 'Alacak',
      width: 100,

      cellRenderer: this.CurrencyCellRendererTR,
    },
    
    {
      field: 'aciklama',
      headerName: 'Açıklama',
      width: 200,
    },
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
      await this.BankaHesapHareketService.getByIdOrGetList("00000000-0000-0000-0000-000000000000",
        () => {},
        (errorMessage) => {
          console.log('Hata....', errorMessage.error);
        }
      )
    ).items;

  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {

  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateBankaHesapModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'BankaHesap Kartı';

    modalRef.result.then(async (item) => {

    });
  }


  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }
}
function cellClass(params: CellClassParams) {
  if (params.value == 0) {
    return 'rag-gray';
  } else if (params.value > 0) {
    return 'rag-green';
  } else {
    return 'rag-red';
  }
}
