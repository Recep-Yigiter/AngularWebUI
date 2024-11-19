import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCariModel } from 'src/app/core/models/cari/update-cari-model';
import { CariHareketService } from 'src/app/core/services/repository/cari-hareket.service';
import { CariService } from 'src/app/core/services/repository/cari.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { DatePipe } from '@angular/common';
import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';
import { HesapPlaniSelectComponent } from 'src/app/pages/stok-yonetimi/stok/core/components/hesap-plani-select';

@Component({
  selector: 'app-update-Cari',
  templateUrl: './update-Cari.component.html',
  styleUrls: ['./update-Cari.component.scss'],
  providers:[DatePipe]
})
export class UpdateCariComponent implements OnInit {
  @Input() data: any;
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  public frameworkComponents;
  selectedTab: any = 'Genel Bilgiler';
  selectedTabIndex = 0;
  stateData: any;
  selectedRow: any;
  constructor(
    private fb: FormBuilder,
    private CariService: CariService,
    public activeModal: NgbActiveModal,
    private MuhasebeKodService:MuhasebeKodService,
  ) {
    this.frameworkComponents = {
      hesapPlaniSelect: HesapPlaniSelectComponent,
     
    };
  }
  async ngOnInit() {

  }
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
  public frm: FormGroup = this.fb.group({
    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
  });
  get kod() {
    return this.frm.get('kod');
  }
  get ad() {
    return this.frm.get('ad');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }

  Kaydet() {
    const createModel = new UpdateCariModel();
    createModel.id = this.data.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.data.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.data.kod;
    createModel.hourId = this.data.hourId;


    this.CariService.update(createModel, () => {
      //this.spinnerService.show();
      const muhasebeKods=[]
      this.rowData.forEach((item) => {
        if (item.hesapAdi != null) {
           
            let muhasebeKod={
              id:item.id,
              cariId:item.cariId,
              hesapId:item.hesapId,
              hareketId:item.hareketId,
              kartTuru:2,
              hareketAdi:item.hareketTipiAdi
          }
            muhasebeKods.push(muhasebeKod)

            
             this.MuhasebeKodService.update(muhasebeKods, () => {
              this.activeModal.close(true);
             });
         
          
        }

        
      });

    });







  }

  cikis() {
    this.activeModal.close(false);
  }













  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }



  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {}


  async refresh() {
    window.location.reload();
  }

  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
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
