import { Component, OnInit } from '@angular/core';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowClassRules,
} from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { UpdateHesapPlaniComponent } from '../update-hesap-plani/update-hesap-plani.component';
import { CreateHesapPlaniComponent } from '../create-hesap-plani/create-hesap-plani.component';
import { HesapService } from 'src/app/core/services/repository/hesap.service';
import { FisService } from 'src/app/core/services/repository/fis.service';
import { FisSatirService } from 'src/app/core/services/repository/fis-satir.service';

@Component({
  selector: 'app-list-hesap-plani',
  templateUrl: './list-hesap-plani.component.html',
  styleUrls: ['./list-hesap-plani.component.scss'],
})
export class ListHesapPlaniComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private HesapService: HesapService, private NgbModal: NgbModal,private FisSatirService:FisSatirService) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    {
      field: 'kod',
      headerName: 'Kod',
      width: 150,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'ad',
      headerName: 'Hesap Adı',
      width: 200,
      filter: 'agTextColumnFilter',
    },
    { field: 'borc', headerName: 'Borç', width: 100 , cellRenderer: this.CurrencyCellRendererTR,},
    { field: 'alacak', headerName: 'Alacak', width: 100 , cellRenderer: this.CurrencyCellRendererTR,},
  ];
  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
  public rowClassRules: RowClassRules = {
    // row style function
    'ust-hesap-warning': (params) => {
      return params.data.parent == null;
    },
    'hesap-title': (params) => {
      return params.data.subRows.length > 0 &&params.data.parent != null;
    },
  };
  async getList(params: GridReadyEvent<any>) {

let deneme=(await this.FisSatirService.list()).items
    




    this.gridApi = params.api;
    this.rowData = (
      await this.HesapService.GetList(
        () => {},
        (errorMessage) => {
          console.log('Hata....', errorMessage.error);
        }
      )
    ).items;

    this.rowData = this.rowData.sort((a, b) => {
      return a.kod.localeCompare(b.kod, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });



  

    const hierarchize = (parent, list) => {
      const children = list.filter((x) => x.parent == parent.kod);
      children.forEach((child) => hierarchize(child, list));
      parent.subRows = children;
    };

    const topLevel = this.rowData.filter((x) => x.parent ==null);
    topLevel.forEach((top) => hierarchize(top, this.rowData));

  }
  selectedHesap: any;
  selectedHesaps: any;
  buttonUpdateDisabled: boolean = true;
  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedHesaps = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedHesap = selectedRow;

    if (selectedRows.length == 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }

    if (selectedRows.length == 0) {
      this.buttonUpdateDisabled = true;
    } else if (selectedRows.length == 1) {
      this.buttonUpdateDisabled = false;
    } else {
      this.buttonUpdateDisabled = true;
    }
  }
  rowDblClick() {
    this.updateModal();
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateHesapPlaniComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Hesap Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateHesapPlaniComponent, {
        size: 'md',
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
          this.HesapService.delete(this.selectedRow.id, () => {
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
