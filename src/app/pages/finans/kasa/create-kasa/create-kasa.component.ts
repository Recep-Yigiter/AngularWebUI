import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBirimModel } from 'src/app/core/models/birim/create-birim-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { KasaService } from 'src/app/core/services/repository/kasa.service';

@Component({
  selector: 'app-create-kasa',
  templateUrl: './create-kasa.component.html',
  styleUrls: ['./create-kasa.component.scss'],
})
export class CreateKasaComponent implements OnInit {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private KasaService: KasaService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {}

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
    const createModel = new CreateBirimModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());

    this.KasaService.create(
      createModel,
      () => {
        this.activeModal.close();
      },
      (errorMessage) => {}
    );
  }



  cikis(){
   this.activeModal.close(false)
  }








}
