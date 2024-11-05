import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CariHareketService } from 'src/app/core/services/repository/cari-hareket.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-cari-hareket',
  templateUrl: './list-cari-hareket.component.html',
  styleUrls: ['./list-cari-hareket.component.scss'],
  providers: [DatePipe],
})
export class ListCariHareketComponent implements OnInit {
  @Input() data: any;

  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private CariHareketService: CariHareketService,
    private NgbModal: NgbModal,
    public activeModal: NgbActiveModal,
    private DatePipe: DatePipe
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    {
      field: 'islemTarihi',
      headerName: 'İşlem Tarihi',
      width: 150,

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
      width: 100,
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
    this.rowData = (await this.CariHareketService.getByIdOrGetList(this.data.id,()=>{})).items

  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {}

  Kaydet() {}
  cikis() {
    this.activeModal.close(false);
  }
  async refresh() {
    window.location.reload();
  }

  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }
}
