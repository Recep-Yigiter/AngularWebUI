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
import { CariService } from 'src/app/core/services/repository/cari.service';
import { CreateCariComponent } from '../create-cari/create-cari.component';
import { UpdateCariComponent } from '../update-cari/update-cari.component';
import { ListCariHareketComponent } from '../core/components/list-cari-hareket/list-cari-hareket.component';
import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';

@Component({
  selector: 'app-list-Cari',
  templateUrl: './list-Cari.component.html',
  styleUrls: ['./list-Cari.component.scss'],
})
export class ListCariComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private CariService: CariService, private NgbModal: NgbModal,private MuhasebeKodService:MuhasebeKodService) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    { field: 'ad', width: 200, filter: 'agTextColumnFilter' },
    { field: 'kod', width: 200,  },
    {
      field: 'adres',
      width: 200,
    },
    {
      field: 'telefon',
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
      await this.CariService.GetList(
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
    this.updateModal();
    // this.cariHareketModal();
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateCariComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Cari Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

 async updateModal() {

    var muhasebeKodlari= (await this.MuhasebeKodService.getByCariId(this.selectedRow.id)).items;
    this.selectedRow.muhasebeKodlari=muhasebeKodlari;
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateCariComponent, {
        size: 'lg',
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
          this.CariService.delete(this.selectedRow.id, () => {
            this.refresh();
          });
        }
      });
    }
  }

  cariHareketModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(ListCariHareketComponent, {
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
