import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  LocaleService,
  IDateFilterParams,
} from 'ag-grid-community';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable, Subscription, filter, map, startWith } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/core/services/repository/Auth.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { Listbox } from 'primeng/listbox';
import { NgxSpinnerService } from 'ngx-spinner';

import * as resize from '../../../../../assets/js/resizable-layout.js';
import { StokFilterService } from '../core/stok-filter.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { UpdateStokComponent } from '../update-stok/update-stok.component';
import { CreateStokComponent } from '../create-stok/create-stok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-stok',
  templateUrl: './list-stok.component.html',
  styleUrls: ['./list-stok.component.scss'],
  providers: [LocaleService, DatePipe],
})
export class ListStokComponent implements OnInit {
  rowData: any;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  public defaultColDef = defaultColDef;
  constructor(
    private StokService: StokService,
    private DatePipe: DatePipe,
    private spinnerService: NgxSpinnerService,
    private stokFilterService: StokFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private NgbModal: NgbModal
  ) {}

  reload() {
    window.location.reload();
  }
  async ngOnInit() {
    resize.resizeFunction();
  }

  colDefs: ColDef[] = [
    { field: 'kod', width: 200, filter: 'agTextColumnFilter' },
    { field: 'ad', width: 500, filter: 'agTextColumnFilter' },
  ];
  filterObj: any = [];
  componentShow: boolean = true;
  async getList(params: GridReadyEvent<any>) {
    this.spinnerService.show();
    this.gridApi = params.api;
    this.gridApi.onFilterChanged();
    this.rowData = (
      await this.StokService.GetList(
        () => {
          this.spinnerService.hide();
        },
        (error) => {
          this.spinnerService.hide();
        }
      )
    ).items;

    this.rowData.forEach((rowData) => {
      const dateSplit = rowData.createdDate.split('T');
      const dateParts = dateSplit[0].split('-');
      rowData.createdDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    });

    this.filterObj = [
      {
        header: 'Stok Grubu',
        field: 'stokGrup',
        accordionSelected: true,
        options: this.uniqueList(this.rowData, 'stokGrup'),
      },
      {
        header: 'Oluşturma Tarihi',
        field: 'createdDate',
        accordionSelected: false,
        options: this.uniqueList(this.rowData, 'createdDate'),
      },
    ];
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedStok = selectedRows;
    this.buttonDisabled=false
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    // this.router.navigate([ROUTER_NAVIGATE.stok_detail], { state: selectedRows })
    this.updateModal();
  }

  searchKeys = { array: [] };
  filterClearDisabled: boolean = true;
  filtredBy: any;
  async filterListbox(event, filterColumn) {
    this.rowData = await this.stokFilterService.filterListbox(
      event,
      filterColumn
    );
  }

  public uniqueList = (arr, comp) => {
    var seen = new Set();
    return arr.filter((c) => !seen.has(c[comp]) && seen.add(c[comp]));
  };

  olustur() {
    this.router.navigate([ROUTER_NAVIGATE.stok_create]);
  }

  buttonDisabled: boolean = true;
  selectedStok: any;
  createModal() {
    const modalRef = this.NgbModal.open(CreateStokComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Stok Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedStok) {
      const modalRef = this.NgbModal.open(UpdateStokComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedStok;

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
    if (this.selectedStok) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.StokService.delete(this.selectedStok.id, () => {
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
