import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from '../components/stok-select-modal/stok-select-modal.component';
import { DeleteButtonComponent } from '../components/delete-button/delete-button.component';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { CreateUrunReceteModel } from '../core/models/create-urun-recete-model';
import { UpdateUrunReceteModel } from '../core/models/update-urun-recete-model';
import { OperasyonSelectModalComponent } from '../components/operasyon-select-modal/operasyon-select-modal.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { UrunReceteHareketService } from 'src/app/core/services/repository/urun-recete-hareket.service';
@Component({
  selector: 'app-update-urun-recete',
  templateUrl: './update-urun-recete.component.html',
  styleUrls: ['./update-urun-recete.component.scss']
})
export class UpdateUrunReceteComponent implements OnInit {

  @Input() data:any;
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UrunReceteService: UrunReceteService,
    private UrunReceteHareketService:UrunReceteHareketService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal
  ) {}
  ngOnInit(): void {}

  colDefs: ColDef[] = [
    { field: 'stokKodu', headerName: 'Stok Kodu', width: 100 },
    { field: 'stokAdi', headerName: 'Stok Adı', width: 150 },
    { field: 'miktar', headerName: 'Miktar', width: 80 ,editable:true},
    { field: 'birimAdi', headerName: 'Birim Adı', width: 100 },
  ];

  public frm: FormGroup = this.fb.group({
    ad: [null, [Validators.required]],
    kod: [null, [Validators.required]],
    stokId: [null, [Validators.required]],
    stokAdi: [null, [Validators.required]],
    stokKodu: [null, [Validators.required]],
    birimAdi: [null, [Validators.required]],
  });

  get ad() {
    return this.frm.get('ad');
  }
  get kod() {
    return this.frm.get('kod');
  }
  get stokId() {
    return this.frm.get('stokId');
  }
  get stokAdi() {
    return this.frm.get('stokAdi');
  }
  get stokKodu() {
    return this.frm.get('stokKodu');
  }
  get birimAdi() {
    return this.frm.get('birimAdi');
  }

  Kaydet() {
    const createModel = new CreateUrunReceteModel();
    this.frm.value.id=this.data.id
    this.frm.value.ad = this.frm.value.ad;
    this.frm.value.kod = this.frm.value.kod;
    this.frm.value.stokId=this.selectedStok?.id ? this.selectedStok?.id : this.data.stokId;
    this.frm.value.stokAdi=this.selectedStok?.ad ? this.selectedStok?.ad : this.data.stokAdi;
    this.frm.value.stokKodu=this.selectedStok?.kod ? this.selectedStok?.kod : this.data.stokKodu;
    this.frm.value.hourId = String(new Date().valueOf());
    this.frm.value.aciklama = this.frm.value.aciklama;
    this.frm.value.urunReceteHareketler = this.getAllRowData();




    this.data.urunReceteHareketler.forEach(element => {
      this.UrunReceteHareketService.delete(element.id)
    });

   this.UrunReceteService.delete(this.data.id)
        this.UrunReceteService.create(this.frm.value, () => {
       this.activeModal.close(true)
     }, errorMessage => {
  
     })



  }
  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }
  cikis() {
    this.activeModal.close(false);
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.data.urunReceteHareketler;
  }
  rowClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }

  Ekle() {
    const modalRef = this.NgbModal.open(StokSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stok) => {
      if (stok != false) {
        let item = {
          stokId: stok.id,
          stokAdi: stok.ad,
          stokKodu: stok.kod,
          miktar:1,
          birimAdi:stok.birimAdi,
          birimKodu:stok.birimKodu,
          birimFiyat:stok.birimFiyat,
          // urunReceteId:null
        };

        this.gridApi.applyTransaction({
          add: [item],
          addIndex: this.gridApi.getLastDisplayedRow() + 1,
        });
      }
    });
  }

  deleteRowData() {
    this.gridApi.applyTransaction({ remove: [this.selectedRow] });
  }

  selectedStok: any;
  StokChildFunc(event) {
    this.selectedStok = event;
  }

  StokSelectModalComponent: any = StokSelectModalComponents;

  
}




 
