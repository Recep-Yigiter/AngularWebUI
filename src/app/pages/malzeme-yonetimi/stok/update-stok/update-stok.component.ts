import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { UpdateStokModel } from 'src/app/core/models/stok/update-stok-model';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';

@Component({
  selector: 'app-update-stok',
  templateUrl: './update-stok.component.html',
  styleUrls: ['./update-stok.component.scss'],
  providers: [CurrencyPipe,]
})
export class UpdateStokComponent {


  BirimDataSource: any[]
  selectedBirim: any;
  stateData: any;
  constructor(
    private fb: FormBuilder,
    private StokService: StokService,
    private BirimService: BirimService,
    private router: Router
  ) {

    this.stateData = history.state;
  }
  async ngOnInit() {

    this.BirimDataSource = (await this.BirimService.list()).items;
  }
  public frm: FormGroup = this.fb.group({

    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    birimFiyat: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
    stokGrup: [null, [Validators.required, Validators.maxLength(16)]],
    durum: [null, [Validators.required, Validators.maxLength(16)]],
    parentId: [null, [Validators.required, Validators.maxLength(16)]],
    birimId: [null, [Validators.required, Validators.maxLength(16)]],
  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get birimFiyat() { return this.frm.get('birimFiyat') }
  get aciklama() { return this.frm.get('aciklama') }
  get stokGrup() { return this.frm.get('stokGrup') }
  get durum() { return this.frm.get('durum') }
  get parentId() { return this.frm.get('parentId') }
  get birimId() { return this.frm.get('birimId') }


  updateStok() {
    const createModel = new UpdateStokModel();
    createModel.id = this.stateData.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.stateData.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.stateData.kod;
    createModel.birimId = this.selectedObject?.id ? this.selectedObject.id : this.stateData.birimId;
    createModel.birimAdi = this.selectedObject?.ad ? this.selectedObject.ad : this.stateData.birimAdi;
    createModel.birimFiyat = this.frm.value.birimFiyat ? this.frm.value.birimFiyat : this.stateData.birimFiyat;
    createModel.stokGrup = this.frm.value.stokGrup;
    createModel.durum = true;
    createModel.aciklama = this.frm.value.aciklama ? this.frm.value.aciklama : "";
    createModel.hourId = this.stateData.hourId;


    this.StokService.update(createModel, () => {
      this.router.navigate(['/menu/malzeme-yonetimi/stok/detail'], { state: createModel })
    })
  }

  getByIdDataSource: any;
  rowData: any
  async stateControl() {
    if (this.stateData?.id) {
      this.getByIdDataSource = (await this.StokService.getById(this.stateData.id));
    }
    else {
      this.getByIdDataSource = this.stateData;
    }
  }





  selectedObject:any;
  changed(event) {
  
    this.selectedBirim = event
    if (this.BirimDataSource != undefined) {
      this.selectedObject = this.BirimDataSource.find((el: any) => {
        return el?.id == this.selectedBirim;
      });
    }
  }








  
  geri() {
    this.router.navigate([ROUTER_NAVIGATE.stok_detail])
  }
  vazgec() {
    this.router.navigate([ROUTER_NAVIGATE.stok_detail])
  }


}
