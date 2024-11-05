import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';


import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { KasaService } from 'src/app/core/services/repository/kasa.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CreateKasaHareketComponent } from '../../kasa-hareket/create-kasa-hareket/create-kasa-hareket.component';
import { ListKasaHareketComponent } from '../../kasa-hareket/list-kasa-hareket/list-kasa-hareket.component';

@Component({
  selector: 'app-list-kasa',
  templateUrl: './list-kasa.component.html',
  styleUrls: ['./list-kasa.component.scss']
})
export class ListKasaComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  constructor(
    private KasaService: KasaService,
    private router:Router,
    private NgbModal: NgbModal
    ) { }

  async ngOnInit() {

  }


  colDefs: ColDef[] = [
    { field: "ad" , width: 200, filter: "agTextColumnFilter",},
    { field: "kod" , width: 200, filter: "agTextColumnFilter",},

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.KasaService.GetList(() => { }, errorMessage =>{console.log("Hata....",errorMessage.error)} )).items;


  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
this.kasaHareketModal()
    // this.router.navigate(['/menu/finans/kasa/detail'],{state:selectedRows})
  }


  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }





  kasaHareketModal(){
    const modalRef = this.NgbModal.open(ListKasaHareketComponent, { size: 'xl', backdrop: 'static',fullscreen:true });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((bankaHesap) => {


    });
  }








}
