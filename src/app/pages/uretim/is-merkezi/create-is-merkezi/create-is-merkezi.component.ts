import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { StokService } from 'src/app/pages/stok/stok/core/services/stok.service';
import { BirimService } from 'src/app/pages/stok/birim/core/services/birim.service';
import { CreateStokModel } from 'src/app/pages/stok/stok/core/models/create-stok-model';

@Component({
  selector: 'app-create-is-merkezi',
  templateUrl: './create-is-merkezi.component.html',
  styleUrls: ['./create-is-merkezi.component.scss']
})
export class CreateIsMerkeziComponent implements OnInit {

  BirimDataSource: any[]
  selectedBirim: any;
  selectedOption: any;
  constructor(
    private fb: FormBuilder,
    private StokService: StokService,
    private BirimService: BirimService,
    private router: Router
  ) {


  }
  async ngOnInit() {
    this.BirimDataSource = (await this.BirimService.list()).data.items;

    this.selectedBirim = this.BirimDataSource[0];

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
    birimAdi: [null, [Validators.required, Validators.maxLength(16)]],
  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get birimFiyat() { return this.frm.get('birimFiyat') }
  get aciklama() { return this.frm.get('aciklama') }
  get stokGrup() { return this.frm.get('stokGrup') }
  get durum() { return this.frm.get('durum') }
  get parentId() { return this.frm.get('parentId') }
  get birimId() { return this.frm.get('birimId') }


  create() {

    const createModel=new CreateStokModel();
    createModel.ad=this.frm.value.ad;
    createModel.kod=this.frm.value.kod;
    createModel.aciklama=this.frm.value.aciklama;
    this.router.navigate(['/pages/is-merkezi/detail-is-merkezi'], { state: createModel })

  }

  defaultBirimFiyat = 0;
  deneme(event) {

    if (event == '') {
      this.defaultBirimFiyat = 0
    }

  }

  changed(event) {
  
    
  }


}
