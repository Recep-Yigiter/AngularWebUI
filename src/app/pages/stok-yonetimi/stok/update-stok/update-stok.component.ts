import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { UpdateStokModel } from 'src/app/core/models/stok/update-stok-model';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BirimSelectModalComponents } from 'src/app/shared/utilities/modals/birim-selected-modal';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  ISelectCellEditorParams,
  ModuleRegistry,
} from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';

import { HesapPlaniSelectComponent } from '../core/components/hesap-plani-select';
import { AgGridAutoCompleteComponent } from '../core/components/auto-complete';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-stok',
  templateUrl: './update-stok.component.html',
  styleUrls: ['./update-stok.component.scss'],
  providers: [CurrencyPipe],
})
export class UpdateStokComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  createModalDisabled: boolean = true;
  public frameworkComponents;
  selectedTab: any = 'Genel Bilgiler';
  selectedTabIndex = 0;
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
      if (index == 0) {
      } else {
      }
    }
  }

  @Input() data;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private StokService: StokService,
    private MuhasebeKodService: MuhasebeKodService,
    private spinnerService: NgxSpinnerService,
  ) {
    this.frameworkComponents = {
      hesapPlaniSelect: HesapPlaniSelectComponent,
      autoComplete: AgGridAutoCompleteComponent,
    };
  }
  ngOnInit(): void {console.log(this.data);}

  //#region  FORM

  public frm: FormGroup = this.fb.group({
    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    birimFiyat: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
    stokGrup: [null, [Validators.required, Validators.maxLength(16)]],
    durum: [null, [Validators.required, Validators.maxLength(16)]],
    parentId: [null, [Validators.required, Validators.maxLength(16)]],
    birimId: [null, [Validators.required, Validators.maxLength(16)]],
  });

  get kod() {
    return this.frm.get('kod');
  }
  get ad() {
    return this.frm.get('ad');
  }
  get birimFiyat() {
    return this.frm.get('birimFiyat');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }
  get stokGrup() {
    return this.frm.get('stokGrup');
  }
  get durum() {
    return this.frm.get('durum');
  }
  get parentId() {
    return this.frm.get('parentId');
  }
  get birimId() {
    return this.frm.get('birimId');
  }

  //#endregion

  Kaydet() {
    const createModel = new UpdateStokModel();
    createModel.id = this.data.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.data.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.data.kod;
    createModel.birimId = this.selectedBirim?.id
      ? this.selectedBirim.id
      : this.data.birimId;
    createModel.birimAdi = this.selectedBirim?.ad
      ? this.selectedBirim.ad
      : this.data.birimAdi;
    createModel.birimFiyat = this.frm.value.birimFiyat
      ? this.frm.value.birimFiyat
      : this.data.birimFiyat;
    createModel.stokGrup = this.frm.value.stokGrup;
    createModel.durum = true;
    createModel.aciklama = this.frm.value.aciklama
      ? this.frm.value.aciklama
      : '';
    createModel.hourId = this.data.hourId;

    this.StokService.update(createModel, () => {
      //this.spinnerService.show();
      const muhasebeKods=[]
      this.rowData.forEach((item) => {
        if (item.hesapAdi != null) {
           
            let muhasebeKod={
            id:item.id,
            stokId:item.stokId,
            hesapId:item.hesapId,
            hareketId:item.hareketId,
            kartTuru:1,
            hareketAdi:item.hareketTipiAdi
          }
            muhasebeKods.push(muhasebeKod)

            
             this.MuhasebeKodService.update(muhasebeKods, () => {
           //   this.spinnerService.hide();
              this.activeModal.close(true);
             });
         
          
        }

        
      });

    });
  }

  cikis() {
    this.activeModal.close(false);
  }

  BirimSelectModalComponent: any = BirimSelectModalComponents;
  selectedBirim: any;
  BirimChildFunc(event) {
    this.selectedBirim = event;
  }

  colDefs: ColDef[] = [
    {
      field: 'hareketTipiAdi',
      headerName: 'Hareket Tipi',
      width: 300,
    },
    {
      field: 'hesapKodu',
      width: 200,
      headerName: 'Hesap Kodu',
      editable: true,
      singleClickEdit: true,
      cellEditor: 'hesapPlaniSelect',
      cellEditorParams: (params) => {},


      valueGetter: (params) => {
        //bu alanda componente stokId Gönderilecek
        params.data.stokId = this.data.id;
        return params.data.hesapKodu;
      },
    },
    {
      field: 'hesapAdi',
      headerName: 'Hesap Adı',
      width: 200,
    },
  ];

  articles = [{ code: 'zgb', id: '1' }];
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData =this.data.muhasebeKodlari
    
  }

  
}
