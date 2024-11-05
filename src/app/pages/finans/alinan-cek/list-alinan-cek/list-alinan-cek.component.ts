import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import * as resize from '../../../../../assets/js/resizable-layout.js';
import { AlinanCekService } from 'src/app/core/services/repository/alinan-cek.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAlinanCekComponent } from '../create-alinan-cek/create-alinan-cek.component';

@Component({
  selector: 'app-list-alinan-cek',
  templateUrl: './list-alinan-cek.component.html',
  styleUrls: ['./list-alinan-cek.component.scss']
})
export class ListAlinanCekComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  constructor(
    private AlinanCekService: AlinanCekService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  async ngOnInit() {
    resize.resizeFunction()
  }


  colDefs: ColDef[] = [
    { field: "seri", headerName: "Seri", width: 200, filter: "agTextColumnFilter", },
    { field: "belgeNo", headerName: "Belge No", width: 600, filter: "agTextColumnFilter", },

  ];
  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.AlinanCekService.list(() => { }, errorMessage => { console.log("Hata....", errorMessage.error) })).items;

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/finans/alinan-cek/detail'], { state: selectedRows })
  }


  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


  createAlinanCek() {
    const modalRef = this.modalService.open(CreateAlinanCekComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((bankaHesap) => {


    });
  }



}
