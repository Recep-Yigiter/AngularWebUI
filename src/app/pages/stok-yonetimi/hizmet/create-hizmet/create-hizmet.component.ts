import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateHizmetModel } from 'src/app/core/models/hizmet/create-hizmet-model';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';



@Component({
  selector: 'app-create-hizmet',
  templateUrl: './create-hizmet.component.html',
  styleUrls: ['./create-hizmet.component.scss']
})
export class CreateHizmetComponent implements OnInit {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private HizmetService: HizmetService,
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
    const createModel = new CreateHizmetModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());

    this.HizmetService.create(
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
