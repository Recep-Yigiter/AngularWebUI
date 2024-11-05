import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBirimModel } from 'src/app/core/models/birim/update-birim-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';

@Component({
  selector: 'app-update-birim',
  templateUrl: './update-birim.component.html',
  styleUrls: ['./update-birim.component.scss'],
})
export class UpdateBirimComponent implements OnInit {
  @Input() data: any;

  constructor(
    private fb: FormBuilder,
    private BirimService: BirimService,
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
    const createModel = new UpdateBirimModel();
    createModel.id = this.data.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.data.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.data.kod;
    createModel.hourId = this.data.hourId;

    this.BirimService.update(
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
