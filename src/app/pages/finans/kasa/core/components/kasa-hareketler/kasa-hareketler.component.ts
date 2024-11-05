import { Component, OnInit } from '@angular/core';
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
import { CreateKasaComponent } from '../../../create-kasa/create-kasa.component';
import { KasaHareketService } from 'src/app/core/services/repository/kasa-hareket.service';

@Component({
  selector: 'app-kasa-hareketler',
  templateUrl: './kasa-hareketler.component.html',
  styleUrls: ['./kasa-hareketler.component.scss'],
  providers:[DatePipe]
})
export class KasaHareketlerComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private KasaHareketService: KasaHareketService, private NgbModal: NgbModal,private DatePipe:DatePipe) {}

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
      maxWidth:90,
      headerName: 'Seri',
    },
    {
      field: 'islemAdi',
      headerName: 'Belge Türü',
      width: 200,
    },
    {
      field: 'kasaKodu',
      headerName: 'Kasa Kodu',
      width: 100,
    },
    {
      field: 'kasaAdi',
      headerName: 'Kasa Adı',
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
      await this.KasaHareketService.getByIdOrGetList("00000000-0000-0000-0000-000000000000",
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
    const modalRef = this.NgbModal.open(CreateKasaComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Kasa Kartı';

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
