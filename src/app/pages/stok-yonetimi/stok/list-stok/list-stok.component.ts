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

} from 'ag-grid-community';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';

import { DatePipe } from '@angular/common';
import { Listbox } from 'primeng/listbox';
import { NgxSpinnerService } from 'ngx-spinner';

import { defaultColDef } from 'src/app/shared/default-col-def';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { UpdateStokComponent } from '../update-stok/update-stok.component';
import { CreateStokComponent } from '../create-stok/create-stok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MUHASEBE_KODLARI } from 'src/MUHASEBE_KODLARI';
import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';
import { StokFilterService } from '../core/stok-filter.service';

@Component({
  selector: 'app-list-stok',
  templateUrl: './list-stok.component.html',
  styleUrls: ['./list-stok.component.scss'],
  providers: [LocaleService, DatePipe],
})
export class ListStokComponent implements OnInit {
  rowData: any;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  // public rowSelection: 'single' | 'multiple' = 'single';
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;

  public defaultColDef = defaultColDef;
  constructor(
    private StokService: StokService,
    private DatePipe: DatePipe,
    private spinnerService: NgxSpinnerService,
    private stokFilterService: StokFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private NgbModal: NgbModal,
    private MuhasebeKodService: MuhasebeKodService
  ) {}

  reload() {
    window.location.reload();
  }
  async ngOnInit() {
   
  }

  colDefs: ColDef[] = [
    {
      field: 'kod',
      width: 200,
      filter: 'agTextColumnFilter',
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { field: 'ad', width: 500, filter: 'agTextColumnFilter' },
  ];
  filterObj: any = [];
  componentShow: boolean = true;
  async getList(params: GridReadyEvent<any>) {
    // this.spinnerService.show();
    this.gridApi = params.api;
    this.gridApi.onFilterChanged();
    this.rowData = (
      await this.StokService.GetList(
        () => {
          // this.spinnerService.hide();
        },
        (error) => {
          // this.spinnerService.hide();
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

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedStoks = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedStok = selectedRow;

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
  rowDblClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedStok = event.data;

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

  buttonDisabled: boolean = true;
  buttonUpdateDisabled: boolean = true;
  selectedStok: any;
  selectedStoks: any;
  createModal() {
    const modalRef = this.NgbModal.open(CreateStokComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Stok Kartı';

    modalRef.result.then(async (item) => {
      if (item) {
        this.refresh();
      }
    });
  }

  async updateModal() {
  var muhasebeKodlari= (await this.MuhasebeKodService.getByStokId(this.selectedStok.id)).items;
  this.selectedStok.muhasebeKodlari=muhasebeKodlari;
    if (this.selectedStok && this.selectedStoks.length < 2) {
      const modalRef = this.NgbModal.open(UpdateStokComponent, {
        size: 'lg',
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
    this.rowData = (
      await this.StokService.GetList(
        () => {
          // this.spinnerService.hide();
        },
        (error) => {
          // this.spinnerService.hide();
        }
      )
    ).items;
  }

  delete() {
    if (this.selectedStok) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.selectedStoks.forEach((element) => {
            this.StokService.delete(element.id, () => {
              this.refresh();
            });
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
