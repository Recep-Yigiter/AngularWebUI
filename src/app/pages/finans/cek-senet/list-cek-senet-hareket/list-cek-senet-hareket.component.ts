import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';
import { CekSenetHareketService } from 'src/app/core/services/repository/cek-senet-hareket.service';
import { KasadanTahsilEdildiComponent } from '../components/kasadan-tahsil-edildi/kasadan-tahsil-edildi.component';
import { KasaHareketService } from 'src/app/core/services/repository/kasa-hareket.service';
import { BankayaTahsilataVerildiComponent } from '../components/bankaya-tahsilata-verildi/bankaya-tahsilata-verildi.component';
import { BankadanTahsilKasaComponent } from '../components/bankadan-tahsil-kasa/bankadan-tahsil-kasa.component';
import { CiroEdildiComponent } from '../components/ciro-edildi/ciro-edildi.component';
import { IadeEdildiComponent } from '../components/iade-edildi/iade-edildi.component';

@Component({
  selector: 'app-list-cek-senet-hareket',
  templateUrl: './list-cek-senet-hareket.component.html',
  styleUrls: ['./list-cek-senet-hareket.component.scss'],
  providers: [DatePipe],
})
export class ListCekSenetHareketComponent implements OnInit {
  @Input() data: any;

  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  createModalDisabled:boolean=true;
  constructor(
    private CekSenetHareketService: CekSenetHareketService,
    private NgbModal: NgbModal,
    public activeModal: NgbActiveModal,
    private DatePipe: DatePipe
  ) {}

  async ngOnInit() {
    if (this.data.durum==4 ||this.data.durum==5) {
      this.createModalDisabled=false;
    }
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
      field: 'islemAdi',
      width: 200,
      headerName: 'İşlem',
    },
    {
      field: 'karsiHesap',
      headerName: 'Karşı Hesap',
      width: 100,
    },
    {
      field: 'karsiHesapAdi',
      headerName: 'Adı',
      width: 200,
    },
    {
      field: 'karsiHesapKodu',
      headerName: 'Kod',
      width: 100,
    },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (
      await this.CekSenetHareketService.getByCekSenetId(this.data.id, () => {})
    ).items;
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

  async KasadanTahsilEdildiModel() {
    const modalRef = this.NgbModal.open(KasadanTahsilEdildiComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.data;

    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (
          await this.CekSenetHareketService.getByCekSenetId(
            this.data.id,
            () => {
              this.createModalDisabled=false;
            }
          )
        ).items;

       
      }
    });
  }

  async BankayaTahsilataVerildiModel() {
    const modalRef = this.NgbModal.open(BankayaTahsilataVerildiComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.data;

    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (
          await this.CekSenetHareketService.getByCekSenetId(
            this.data.id,
            () => {}
          )
        ).items;

       
      }
    });
  }


  async BankadanTahsilKasaModel() {
    const modalRef = this.NgbModal.open(BankadanTahsilKasaComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.data;

    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (
          await this.CekSenetHareketService.getByCekSenetId(
            this.data.id,
            () => {  this.createModalDisabled=false;}
          )
        ).items;

       
      }
    });
  }

  async CiroEdildiModel() {
    const modalRef = this.NgbModal.open(CiroEdildiComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.data;

    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (
          await this.CekSenetHareketService.getByCekSenetId(
            this.data.id,
            () => {}
          )
        ).items;
      }
    });
  }

  async IadeEdildiModal() {
    const modalRef = this.NgbModal.open(IadeEdildiComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.data;

    modalRef.result.then(async (item) => {
      if (item) {
        this.rowData = (
          await this.CekSenetHareketService.getByCekSenetId(
            this.data.id,
            () => {}
          )
        ).items;

       
      }
    });
  }






}
