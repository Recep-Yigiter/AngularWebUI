import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CariHareketService } from 'src/app/core/services/repository/cari-hareket.service';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-virman-genel',
  templateUrl: './virman-genel.component.html',
  styleUrls: ['./virman-genel.component.scss'],
  providers:[DatePipe]
})
export class VirmanGenelComponent implements OnInit {
  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private DatePipe:DatePipe
  ) {}
  ngOnInit(): void {}

  public frm: FormGroup = this.fb.group({
    islemTuru: [null, [Validators.required]],
    seriNo: [null, [Validators.required]],
    belgeNo: [null, [Validators.required]],
    referansNo: [null, [Validators.required]],
    belgeTarihi: [null, [Validators.required]],
    valorTarihi: [null, [Validators.required]],
    aciklama: [null, [Validators.required]],
  });


  get seriNo() {
    return this.frm.get('seriNo');
  }
  get belgeNo() {
    return this.frm.get('belgeNo');
  }
  get referansNo() {
    return this.frm.get('referansNo');
  }
  get belgeTarihi() {
    return this.frm.get('belgeTarihi');
  }
  get valorTarihi() {
    return this.frm.get('valorTarihi');
  }

  get aciklama() {
    return this.frm.get('aciklama');
  }

  async Kaydet() {


  }

  cikis() {
    this.activeModal.close(false);
  }


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
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
      maxWidth: 90,
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
      field: 'islemAdi',
      headerName: 'Belge Türü',
      width: 200,
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
    this.rowData =[];
  }

}
