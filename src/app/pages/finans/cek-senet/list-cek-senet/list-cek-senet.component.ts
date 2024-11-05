import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { CreateCekSenetComponent } from '../create-cek-senet/create-cek-senet.component';
import { UpdateCekSenetComponent } from '../update-cek-senet/update-cek-senet.component';
import { CekSenetService } from 'src/app/core/services/repository/cek-senet.service';
import { ListCekSenetHareketComponent } from '../list-cek-senet-hareket/list-cek-senet-hareket.component';
import { CariHareketService } from 'src/app/core/services/repository/cari-hareket.service';

@Component({
  selector: 'app-list-cek-senet',
  templateUrl: './list-cek-senet.component.html',
  styleUrls: ['./list-cek-senet.component.scss'],
})
export class ListCekSenetComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  selectedTab: any = 'Hepsi';
  selectedTabIndex = 6;
  stateData: any;
  
  async tabChanceFilter(tab, event) {
    this.selectedTab = tab;

    function getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement;
    }

    let ul = document.getElementById('squareList');
    let target = getEventTarget(event);
    let li = target.closest('li'); // get reference
    let nodes = Array.from(li.closest('ul').children); // get array
    let index = nodes.indexOf(li);
    this.selectedTabIndex = index;
    if (!li.classList.contains('active')) {
      if (index == 6) {
        this.rowData = await this.filterByState();
      } else {
        this.rowData = (await this.filterByState()).filter(
          (c) => c.durumAdi == this.selectedTab
        );
      }
    }
  }

  constructor(
    private CekSenetService: CekSenetService,
    private NgbModal: NgbModal,
    private CariHareketService: CariHareketService
  ) {this.stateData=history.state}

  filterToData: any;
  async ngOnInit() {
    
this.createModalDisabled=this.stateData.createModal;

  }

  colDefs: ColDef[] = [
    {
      field: 'durumAdi',
      headerName: 'Durum',
      width: 120,
      checkboxSelection: true,
    },
    { field: 'seriNo', headerName: 'SeriNo', maxWidth: 70 },
    { field: 'islemNo', headerName: 'İşlem No', width: 100 },
    { field: 'alinisTarihi', headerName: 'Düz. Tarihi', width: 100 },
    { field: 'vadeTarihi', headerName: 'Vade Tarihi', width: 100 },
    { field: 'cariAdi', headerName: 'Firma Adı', width: 150 },
    { field: 'cariKodu', headerName: 'Firma Kodu', width: 150 },
    {
      field: 'tutar',
      headerName: 'Tutar',
      width: 100,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    { field: 'ciro', headerName: 'Ciro', maxWidth: 70 },
    { field: 'banka', headerName: 'Banka', width: 200 },
    { field: 'bankaSube', headerName: 'Banka Şube', width: 200 },
    { field: 'hesapNo', headerName: 'Hesap No', width: 100 },
    { field: 'sehir', headerName: 'Şehir', width: 100 },
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

    if (this.selectedTabIndex == 6) {
      this.rowData = await this.filterByState();
    } else {
      this.rowData = (await this.filterByState()).filter(
        (c) => c.durumAdi == this.selectedTab
      );
    }
  }
  selectedCekSenet: any;
  selectedCekSenets: any;
  buttonUpdateDisabled: boolean = true;
  createModalDisabled:boolean=false;
  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedCekSenets = selectedRows;

    const selectedRow = this.gridApi.getSelectedRows()[0];
    this.selectedCekSenet = selectedRow;

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
    // this.updateModal();
    this.cekSenetHareketModal();
  }

  createModal() {
    if (this.createModalDisabled) {
      const modalRef = this.NgbModal.open(CreateCekSenetComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      let dropdownObj = this.stateData.createValue;
      modalRef.componentInstance.data = dropdownObj;
  
      modalRef.result.then(async (item) => {
        if (item) {
          // this.refresh();
  
          let cariHareket = {
            cariId: item.cariId,
            karsiHesap:
              item.cekSenetTipi == 1
                ? 'Müşteri Çeki'
                : item.cekSenetTipi == 2
                ? 'Müşteri Senedi'
                : item.cekSenetTipi == 3
                ? 'Kendi Çekimiz'
                : item.cekSenetTipi == 4
                ? 'Kendi Senedimiz'
                : '',
            karsiHesapAdi: null,
            karsiHesapKodu: null,
            islemTarihi: item.alinisTarihi,
            islem: 1,
            seriNo: item.seriNo,
            alacak:
              item.cekSenetTipi == 1 || item.cekSenetTipi == 2 ? item.tutar : 0,
            borc:
              item.cekSenetTipi == 3 || item.cekSenetTipi == 4 ? item.tutar : 0,
            aciklama: item.aciklama,
          };
  
          await this.CariHareketService.create(cariHareket, async () => {
            this.rowData = await this.filterByState();
          });
        }
      });
    }

  }

  updateModal() {
    // if (this.selectedRow) {
    //   const modalRef = this.NgbModal.open(UpdateCekSenetComponent, {
    //     size: 'md',
    //     backdrop: 'static',
    //   });
    //   modalRef.componentInstance.data = this.selectedRow;
    //   modalRef.result.then(async (item) => {
    //     if (item == true) {
    //       this.refresh();
    //     }
    //   });
    // }
  }

  async filterByState() {
    const filters = {
      cekSenetTipi: history.state.filterBy,
    };
    return (await this.CekSenetService.list()).items.filter((obj) =>
      Object.entries(filters).every(
        ([k, p]) => p.length === 0 || p.includes(obj[k])
      )
    );
  }

  delete() {
    console.log(this.selectedCekSenet);
    if (this.selectedCekSenet) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.CekSenetService.delete(this.selectedRow.id, () => {
            this.filterByState();
          });
        }
      });
    }
  }
  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }

  cekSenetHareketModal() {
    const modalRef = this.NgbModal.open(ListCekSenetHareketComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.selectedCekSenet;

    modalRef.result.then(async (item) => {
      window.location.reload();
      // if (item) {
      //   if (this.selectedTabIndex == 6) {
      //     this.rowData = await this.filterByState();
      //     window.location.reload();
      //   } else {
      //     this.rowData = this.rowData = (await this.filterByState()).filter(
      //       (c) => c.durumAdi == this.selectedTab
      //     );
      //     window.location.reload();
      //   }
      // }
    });
  }

 
}
