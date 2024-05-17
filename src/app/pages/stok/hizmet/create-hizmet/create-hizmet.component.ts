import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateHizmetModel } from '../core/models/create-hizmet-model';
import { HizmetService } from '../core/services/hizmet.service';


@Component({
  selector: 'app-create-hizmet',
  templateUrl: './create-hizmet.component.html',
  styleUrls: ['./create-hizmet.component.scss']
})
export class CreateHizmetComponent {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private HizmetService: HizmetService
  ) {


  }
  ngOnInit(): void {

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




  createHizmet() {

    const createModel = new CreateHizmetModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());


    this.HizmetService.create(createModel, () => {
      this.router.navigate(['/hizmet/detail'], { state: createModel })
    }, errorMessage => { })



  }
}
