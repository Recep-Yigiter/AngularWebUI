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
import { CreateUrunReceteComponent } from '../create-urun-recete/create-urun-recete.component';
import { CreateUrunReceteHareketComponent } from '../../urun-recete-hareket/create-urun-recete-hareket/create-urun-recete-hareket.component';
import { ListUrunReceteHareketComponent } from '../../urun-recete-hareket/list-urun-recete-hareket/list-urun-recete-hareket.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';

@Component({
  selector: 'app-list-urun-recete',
  templateUrl: './list-urun-recete.component.html',
  styleUrls: ['./list-urun-recete.component.scss'],
  providers: [DatePipe],
})
export class ListUrunReceteComponent implements OnInit {
  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  colDefs: ColDef[] = [
    { field: 'kod', headerName: 'Kod',width:120 },
    { field: 'ad', headerName: 'Reçete Adı' },
    { field: 'stokAdi', headerName: 'Stok Adı' },
    { field: 'bilesenSayisi', headerName: 'Bileşen Sayısı',width:90 },
  ];

  /**
   *
   */
  constructor(
    private UrunReceteService: UrunReceteService,
    private router: Router,
    private DatePipe: DatePipe,
    private NgbModal: NgbModal
  ) {}
  ngOnInit(): void {
    resize.resizeFunction();
  }

  rowDataCount: any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.UrunReceteService.GetList(() => {})).items;
    this.rowData.forEach((item)=>{

      item.bilesenSayisi=item.urunReceteHareketler.length
    }) 

  }

  filterSideMenu() {
    var element = document.getElementById('filter_menu');
    element.classList.toggle('mystyle');
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));

    return rowData;
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.urunReceteHareketModal(selectedRows);
  }

  createRecete() {
    const modalRef = this.NgbModal.open(CreateUrunReceteComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then(async (bankaHesap) => {
      this.rowData = (await this.UrunReceteService.GetList(() => {})).items;
    });
  }

  urunReceteHareketModal(item) {
    const modalRef = this.NgbModal.open(ListUrunReceteHareketComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.componentInstance.urunReceteData =item;
    modalRef.result.then(async (bankaHesap) => {
      this.rowData = (await this.UrunReceteService.GetList(() => {})).items;
      this.rowData.forEach((item)=>{
    
        item.bilesenSayisi=item.urunReceteHareketler.length
      })
    });
  }
}
