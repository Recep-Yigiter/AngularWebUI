import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, LocaleService, IDateFilterParams, } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Observable, Subscription, filter, map, startWith } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/core/services/repository/Auth.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { Listbox } from 'primeng/listbox';
import { NgxSpinnerService } from 'ngx-spinner';


import * as resize from '../../../../../assets/js/resizable-layout.js';
import { StokFilterService } from '../core/stok-filter.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { StokService } from 'src/app/core/services/repository/stok.service';

@Component({
  selector: 'app-list-stok',
  templateUrl: './list-stok.component.html',
  styleUrls: ['./list-stok.component.scss'],
  providers: [LocaleService, DatePipe],
})
export class ListStokComponent implements OnInit {

  rowData: any;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;



  public defaultColDef = defaultColDef;
  constructor(
    private StokService: StokService,
    private router: Router,
    private DatePipe: DatePipe,
    private spinnerService: NgxSpinnerService,
    private stokFilterService: StokFilterService
  ) {
  }
  async ngOnInit() {
    resize.resizeFunction()


  }

  colDefs: ColDef[] = [
    { field: "kod", width: 200, filter: "agTextColumnFilter", },
    { field: "ad", width: 500, filter: "agTextColumnFilter", },
  ];
  filterObj: any = [];
  componentShow: boolean=true;
  async getList(params: GridReadyEvent<any>) {
  
    this.spinnerService.show();
    this.gridApi = params.api;
    this.gridApi.onFilterChanged()
    this.rowData = (await this.StokService.GetList(() => {
      this.spinnerService.hide();
    }, error => { this.spinnerService.hide() })).items;


    this.rowData.forEach((rowData) => {
      const dateSplit = rowData.createdDate.split("T");
      const dateParts = dateSplit[0].split("-");
      rowData.createdDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`

    })

    this.filterObj = [
      {
        header: "Stok Grubu",
        field: "stokGrup",
        accordionSelected: true,
        options: this.uniqueList(this.rowData, "stokGrup"),
      },
      {
        header: "Oluşturma Tarihi",
        field: "createdDate",
        accordionSelected: false,
        options: this.uniqueList(this.rowData, "createdDate"),
      }
    ]


  }







  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/malzeme-yonetimi/stok/detail'], { state: selectedRows })
  }








  searchKeys = { array: [] };
  filterClearDisabled: boolean = true;
  filtredBy: any;
  async filterListbox(event, filterColumn) {


    this.rowData = await this.stokFilterService.filterListbox(event, filterColumn)
    // this.rowData = (await this.StokService.GetList(() => { })).items;
    // this.filtredBy=event.value;
    // if (this.filtredBy.length == 0) {
    //   this.searchKeys[filterColumn] = []
    // }

    // this.filtredBy.reduce((acc, obj) => {
    //   acc[filterColumn] = this.filtredBy.map(c => c[filterColumn]).map(c => { return c.toLowerCase(); });
    //   return acc
    // }, this.searchKeys)

    // const filter = this.rowData.filter(obj =>
    //   Object.entries(this.searchKeys).every(([k, p]) => (
    //     p.length === 0 || p.map(c => c.toLowerCase()).includes(obj[k].toLowerCase())
    //   ))
    // )
    // this.rowData = filter

    // if (this.filtredBy.length > 0) {
    //   this.filterClearDisabled = false
    // }
  }














  public uniqueList = (arr, comp) => {
    var seen = new Set;
    return arr.filter(c => !seen.has(c[comp]) && seen.add(c[comp]));
  }































}




































