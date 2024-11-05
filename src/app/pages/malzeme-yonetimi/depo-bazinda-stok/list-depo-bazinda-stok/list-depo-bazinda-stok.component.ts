import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { DepoBazindaStokService } from 'src/app/core/services/repository/depo-bazinda-stok.service';
import { DepoService } from 'src/app/core/services/repository/depo.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { DepoBazindaStokFilterService } from '../core/depo-bazinda-stok-filter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDepoBazindaStokComponent } from '../update-depo-bazinda-stok/update-depo-bazinda-stok.component';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { UpdateDepoComponent } from '../../depo/update-depo/update-depo.component';
import { CreateDepoBazindaStokComponent } from '../create-depo-bazinda-stok/create-depo-bazinda-stok.component';

@Component({
  selector: 'app-list-depo-bazinda-stok',
  templateUrl: './list-depo-bazinda-stok.component.html',
  styleUrls: ['./list-depo-bazinda-stok.component.scss'],
})
export class ListDepoBazindaStokComponent implements OnInit {
  public uniqueList = (arr, comp) => {
    var seen = new Set();
    return arr.filter((c) => !seen.has(c[comp]) && seen.add(c[comp]));
  };

  filterObj: any = [];
  searchKeys = { array: [] };
  filterClearDisabled: boolean = true;
  filtredBy: any;
  async filterListbox(event, filterColumn) {
    this.rowData = await this.DepoBazindaStokFilterService.filterListbox(
      event,
      filterColumn
    );
  }

  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private DepoBazindaStokService: DepoBazindaStokService,
    private NgbModal: NgbModal,
    private DepoBazindaStokFilterService: DepoBazindaStokFilterService
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    { field: 'depoAdi', width: 200 },
    { field: 'stokAdi', width: 200, filter: 'agTextColumnFilter' },
    {
      field: 'miktar',
      width: 100,
      valueFormatter: (params) => params.data.miktar.toFixed(2),
    },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.DepoBazindaStokService.GetList(() => {})).items;
    this.rowData.forEach((rowData) => {
      const dateSplit = rowData.createdDate.split('T');
      const dateParts = dateSplit[0].split('-');
      rowData.createdDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    });

    this.filterObj = [
      {
        header: 'Depo',
        field: 'depoAdi',
        accordionSelected: true,
        options: this.uniqueList(this.rowData, 'depoAdi'),
      },
      {
        header: 'Oluşturma Tarihi',
        field: 'createdDate',
        accordionSelected: false,
        options: this.uniqueList(this.rowData, 'createdDate'),
      },
    ];
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
    const modalRef = this.NgbModal.open(CreateDepoBazindaStokComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'DepoBazindaStok Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateDepoBazindaStokComponent, {
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
          this.DepoBazindaStokService.delete(this.selectedRow.id, () => {
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
