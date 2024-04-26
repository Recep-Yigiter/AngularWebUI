import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasrafService } from '../core/services/masraf.service';
import { CreateMasrafModel } from '../core/models/create-masraf-model';
import { BirimService } from '../../birim/core/services/birim.service';


@Component({
  selector: 'app-create-masraf',
  templateUrl: './create-masraf.component.html',
  styleUrls: ['./create-masraf.component.scss']
})
export class CreateMasrafComponent implements OnInit {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private MasrafService: MasrafService,
    private BirimService: BirimService
  ) {


  }
  ngOnInit(): void {
    this.getAllBirim()
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




  createMasraf() {

    const createModel = new CreateMasrafModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());


    this.MasrafService.create(createModel, () => {
      this.router.navigate(['/pages/Masraf/detail-Masraf'], { state: createModel })
    }, errorMessage => { })



  }
  selectedBirim: any
  BirimDataSource: any;
  changed(event) {

    this.selectedBirim = event;

  }

  async getAllBirim() {
    this.BirimDataSource = (await this.BirimService.list(() => { })).data.items;
  }
}
