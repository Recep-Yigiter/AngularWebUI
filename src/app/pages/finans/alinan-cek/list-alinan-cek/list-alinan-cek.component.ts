import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { AlinanCekService } from 'src/app/core/services/repository/alinan-cek.service';
import { CreateAlinanCekComponent } from '../create-alinan-cek/create-alinan-cek.component';
import { UpdateAlinanCekComponent } from '../update-alinan-cek/update-alinan-cek.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-alinan-cek',
  templateUrl: './list-alinan-cek.component.html',
  styleUrls: ['./list-alinan-cek.component.scss'],
  providers:[DatePipe]
})
export class ListAlinanCekComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private AlinanCekService: AlinanCekService,
    private NgbModal: NgbModal,
    private DatePipe:DatePipe
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    //  aciklama :  null
    //  alinisTarihi :  "2024-09-19T00:00:00"
    //  bankaId :  "eca0b066-4207-462b-d518-08dcd18871a2"
    //  belgeNo :  "235235"
    //  cariId :  "30bbf158-ffaf-4d1f-eb17-08dccb3e448f"
    // createdDate :  "2024-09-10T14:39:53.6396242"
    // createdUser :  "1c452a48-269d-4fe6-a337-a4feb0e15da4"
    // durum :  null
    // hourId :  null
    // id :  "94452fc7-9baa-477f-8578-08dcd18beb4b"
    // referans :  null
    // rowStatus :  1
    // seri :  "AÇ"
    //  tutar :  0
    //  updatedDate :  "0001-01-01T00:00:00"
    //  updatedUser :  "00000000-0000-0000-0000-000000000000"
    //  vadeTarihi :  "2024-10-04T00:00:00"
    //   valorTarihi :  "2024-09-19T00:00:00"
    //   vergiDairesi :  "sdghshsh"
    //    vergiNo :
    //     "234235"

    {
      field: 'createdDate',
      headerName: 'Hareket Tarihi',
      width: 120,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
      pinned: 'left',
    },
    { field: 'seri', headerName: 'Seri', width: 70, pinned: 'left' },
    { field: 'belgeNo', headerName: 'Belge No', width: 150, pinned: 'left' },
    
    { field: 'cariKodu', headerName: 'Cari Kodu', width: 150 },
    {
      field: 'cariAdi',
      headerName: 'Cari Adı',
      width: 350,
      filter: 'agTextColumnFilter',
    },
    
    { field: 'referans', headerName: 'Referans', width: 150 },
    {
      field: 'vadeTarihi',
      headerName: 'Vade Tarihi',
      width: 120,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
      pinned: 'left',
    },
    {
      field: 'valorTarihi',
      headerName: 'Valor Tarihi',
      width: 120,
      valueFormatter: (params) =>
      this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
      pinned: 'left',
    },
    { field: 'aciklama', headerName: 'Açıklama' },
    { field: 'vergiDairesi', headerName: 'Vergi Dairesi' },
    { field: 'vergiNo', headerName: 'Vergi No' },
    
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (
      await this.AlinanCekService.list(
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
    this.updateModal();
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateAlinanCekComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Birim Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateAlinanCekComponent, {
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

  delete() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.AlinanCekService.delete(this.selectedRow.id, () => {
            this.refresh();
          });
        }
      });
    }
  }
  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }


  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }

}
