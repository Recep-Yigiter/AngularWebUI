import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent,CellClassParams } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { BankaService } from 'src/app/core/services/repository/banka.service';
import { CreateBankaComponent } from '../create-banka/create-banka.component';
import { UpdateBankaComponent } from '../update-banka/update-banka.component';

@Component({
  selector: 'app-list-Banka',
  templateUrl: './list-Banka.component.html',
  styleUrls: ['./list-Banka.component.scss'],
})
export class ListBankaComponent implements OnInit {


  
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private BankaService: BankaService, private NgbModal: NgbModal) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    { field: 'ad', width: 200, filter: 'agTextColumnFilter' },
    { field: 'kod', width: 200, filter: 'agTextColumnFilter' },
    {
      field: 'bakiye',
      width: 200,
      filter: 'agTextColumnFilter',
      cellRenderer: this.CurrencyCellRendererTR,
      cellClass: cellClass,
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
      await this.BankaService.GetList(
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
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateBankaComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Banka Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {

    if (this.selectedRow) {
  
      const modalRef = this.NgbModal.open(UpdateBankaComponent, {
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
          this.BankaService.delete(this.selectedRow.id, () => {
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