import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCariModel } from 'src/app/core/models/cari/create-cari-model';
import { CariService } from 'src/app/core/services/repository/cari.service';

@Component({
  selector: 'app-create-cari',
  templateUrl: './create-cari.component.html',
  styleUrls: ['./create-cari.component.scss'],
})
export class CreateCariComponent implements OnInit {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CariService: CariService,
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
    const createModel = new CreateCariModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());

    this.CariService.create(
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
