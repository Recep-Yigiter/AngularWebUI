import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDepoModel } from 'src/app/core/models/depo/create-depo-model';
import { DepoService } from 'src/app/core/services/repository/depo.service';

@Component({
  selector: 'app-create-depo',
  templateUrl: './create-depo.component.html',
  styleUrls: ['./create-depo.component.scss']
})
export class CreateDepoComponent implements OnInit {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private DepoService: DepoService,
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
    const createModel = new CreateDepoModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());

    this.DepoService.create(
      createModel,
      () => {
        this.activeModal.close();
      },
      (errorMessage) => {}
    );
  }

cikis(){
  
}






}
