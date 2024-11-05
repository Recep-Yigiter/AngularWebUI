import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellClassParams,
} from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankaHesapHareketService } from 'src/app/core/services/repository/banka-hesap-hareket.service';
import { BankaHesapSelectModalComponents } from 'src/app/shared/utilities/modals/banka-hesap-selected-modal';
import { BankaHesapService } from 'src/app/core/services/repository/banka-hesap.service';

@Component({
  selector: 'app-banka-hesap',
  templateUrl: './banka-hesap.component.html',
  styleUrls: ['./banka-hesap.component.scss'],
  providers: [DatePipe],
})
export class BankaHesapComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  BankaHesapFiltreButtonDisable: boolean = true;

  constructor(
    private BankaHesapHareketService: BankaHesapHareketService,
    private BankaHesapService: BankaHesapService,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {}

  public frm: FormGroup = this.fb.group({
    BankaHesapAdi: [null, [Validators.required]],
    BankaHesapId: [null, [Validators.required]],
  });
  get BankaHesapAdi() {
    return this.frm.get('BankaHesapAdi');
  }
  get BankaHesapId() {
    return this.frm.get('BankaHesapId');
  }

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
      width: 120,
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
      field: 'islemAdi',
      headerName: 'Belge Türü',
      width: 200,
    },
    {
      field: 'aciklama',
      headerName: 'Açıklama',
      width: 300,
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

    this.rowData = [];
  }
  async BankaHesapfiltrele() {
    if (
      this.selectedBankaHesap?.id != undefined &&
      this.BankaHesapFiltreButtonDisable == false
    ) {
      this.rowData = (
        await this.BankaHesapHareketService.getByIdOrGetList(
          this.selectedBankaHesap?.id,
          () => {},
          (errorMessage) => {
            console.log('Hata....', errorMessage.error);
          }
        )
      ).items;
    }
  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {}

  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }

  BankaHesapSelectModalComponent: any = BankaHesapSelectModalComponents;
  selectedBankaHesap: any;
  async BankaHesapChildFunc(event) {
    this.selectedBankaHesap = event;
    this.BankaHesapFiltreButtonDisable = false;

    const data: any = await this.BankaHesapService.getById(
      this.selectedBankaHesap?.id
    );
    this.rowData = data.bankaHesapHareketler;
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
