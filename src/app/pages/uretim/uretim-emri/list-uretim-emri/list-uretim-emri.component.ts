import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import * as resize from '../../../../../assets/js/resizable-layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUrunReceteHareketComponent } from '../../urun-recete-hareket/create-urun-recete-hareket/create-urun-recete-hareket.component';
import { ListUrunReceteHareketComponent } from '../../urun-recete-hareket/list-urun-recete-hareket/list-urun-recete-hareket.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
import { UretimEmriService } from 'src/app/core/services/repository/uretim-emri.service';
import { CreateUretimEmriComponent } from '../create-uretim-emri/create-uretim-emri.component';
import { UretimEmriFilterService } from '../core/uretim-emri-filter.service';
import { UpdateUretimEmriComponent } from '../update-uretim-emri/update-uretim-emri.component';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';

@Component({
  selector: 'app-list-uretim-emri',
  templateUrl: './list-uretim-emri.component.html',
  styleUrls: ['./list-uretim-emri.component.scss'],
  providers: [DatePipe],
})
export class ListUretimEmriComponent implements OnInit {
  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  colDefs: ColDef[] = [
    {
      field: 'uretimDurumu',
      headerName: 'Durum',
      width: 90,

      cellStyle: (params) => {
        if (params.value === 'Beklemede') {
          return { color: 'white', backgroundColor: 'gray' };
        }
        if (params.value === 'Üretiliyor') {
          return { color: 'white', backgroundColor: 'orange' };
        }
        if (params.value === 'Sevk Edildi') {
          return { color: 'white', backgroundColor: 'green' };
        }
        return null;
      },
    },
    {
      field: 'siparisTarihi',
      headerName: 'Sipariş Tarihi',
      width: 90,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    {
      field: 'teslimTarihi',
      headerName: 'Teslim Tarihi',
      width: 90,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    {
      field: 'cariAdi',
      headerName: 'Firma Adı',
      width: 300,
      filter: 'agTextColumnFilter',
    },
    { field: 'referans', headerName: 'Referans', width: 300 },
    {
      field: 'miktar',
      headerName: 'Miktar',
      maxWidth: 70,
      valueFormatter: (params) => params.data.miktar.toFixed(2),
    },
    { field: 'birimAdi', headerName: 'Birim', maxWidth: 70 },
    {
      field: 'sevkTarihi',
      headerName: 'Sevk Tarihi',
      width: 90,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    {
      field: 'stokAdi',
      headerName: 'Stok',
      width: 300,
      filter: 'agTextColumnFilter',
    },
  ];

  constructor(
    private UretimEmriService: UretimEmriService,
    private router: Router,
    private DatePipe: DatePipe,
    private NgbModal: NgbModal,
    private UretimEmriFilterService: UretimEmriFilterService
  ) {}
  ngOnInit(): void {
    resize.resizeFunction();
  }

  rowDataCount: any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.UretimEmriService.GetList(() => {})).items;
    this.rowData.forEach((rowData) => {
      const dateSplit = rowData.createdDate.split('T');
      const dateParts = dateSplit[0].split('-');
      rowData.createdDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    });

    this.filterObj = [
      {
        header: 'Durum',
        field: 'uretimDurumu',
        accordionSelected: true,
        options: this.uniqueList(this.rowData, 'uretimDurumu'),
      },
      {
        header: 'Firma',
        field: 'cariAdi',
        accordionSelected: false,
        options: this.uniqueList(this.rowData, 'firma'),
      },
    ];
  }
  filterObj: any = [];
  searchKeys = { array: [] };
  filterClearDisabled: boolean = true;
  filtredBy: any;
  async filterListbox(event, filterColumn) {
    this.rowData = await this.UretimEmriFilterService.filterListbox(
      event,
      filterColumn
    );
  }

  public uniqueList = (arr, comp) => {
    var seen = new Set();
    return arr.filter((c) => !seen.has(c[comp]) && seen.add(c[comp]));
  };

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));

    return rowData;
  }

  selectedUretimEmri
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedUretimEmri=selectedRows
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    if (selectedRows.uretimDurumu != 'Sevk Edildi') {
      this.updateUretimEmriModal(selectedRows);
    }
  }

  createUretimEmriModal() {
    const modalRef = this.NgbModal.open(CreateUretimEmriComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';

    modalRef.result.then(async (bankaHesap) => {
      this.rowData = (await this.UretimEmriService.GetList(() => {})).items;
    });
  }

  updateUretimEmriModal(event) {
    const modalRef = this.NgbModal.open(UpdateUretimEmriComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = event;

    modalRef.result.then(async (bankaHesap) => {
      this.rowData = (await this.UretimEmriService.GetList(() => {})).items;
    });
  }


  
  delete() {
    const modalRef = this.NgbModal.open(DeleteModalComponents, {
      size: 'sm',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((event) => {
      if (event == true) {
        this.UretimEmriService.delete(this.selectedUretimEmri.id, () => {
          this.getAllRow()
        });
      }
    });
    //
  }

 async getAllRow() {
    this.rowData =(await this.UretimEmriService.GetList(() => {})).items;
  }
}
