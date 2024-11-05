import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDepoModel } from 'src/app/core/models/depo/update-depo-model';
import { DepoService } from 'src/app/core/services/repository/depo.service';


@Component({
  selector: 'app-update-depo',
  templateUrl: './update-depo.component.html',
  styleUrls: ['./update-depo.component.scss']
})
export class UpdateDepoComponent implements OnInit {
  @Input() data: any;

  constructor(
    private fb: FormBuilder,
    private DepoService: DepoService,
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
    const createModel = new UpdateDepoModel();
    createModel.id = this.data.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.data.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.data.kod;
    createModel.hourId = this.data.hourId;

    this.DepoService.update(
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
