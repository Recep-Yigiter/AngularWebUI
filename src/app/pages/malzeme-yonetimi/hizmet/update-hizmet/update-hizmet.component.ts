import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateHizmetModel } from 'src/app/core/models/hizmet/update-hizmet-model';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';


@Component({
  selector: 'app-update-hizmet',
  templateUrl: './update-hizmet.component.html',
  styleUrls: ['./update-hizmet.component.scss']
})
export class UpdateHizmetComponent implements OnInit {
  @Input() data: any;

  constructor(
    private fb: FormBuilder,
    private HizmetService: HizmetService,
    public activeModal: NgbActiveModal
  ) {}
  async ngOnInit() {}

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
    const createModel = new UpdateHizmetModel();
    createModel.id = this.data.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.data.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.data.kod;
    createModel.hourId = this.data.hourId;

    this.HizmetService.update(
      createModel,
      () => {
        this.activeModal.close();
      },
      (errorMessage) => {}
    );
  }

  cikis() {
    this.activeModal.close(false);
  }
}
