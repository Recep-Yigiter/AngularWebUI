import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMasrafModel } from 'src/app/core/models/masraf/update-masraf-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { MasrafService } from 'src/app/core/services/repository/masraf.service';

import { BirimSelectModalComponents } from 'src/app/shared/utilities/modals/birim-selected-modal';


@Component({
  selector: 'app-update-masraf',
  templateUrl: './update-masraf.component.html',
  styleUrls: ['./update-masraf.component.scss']
})
export class UpdateMasrafComponent implements OnInit {
  @Input() data;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private MasrafService: MasrafService
  ) {}
  ngOnInit(): void {
    
  }

  public frm: FormGroup = this.fb.group({
    kod: [null],
    ad: [null],
    birimId: [null],
    aciklama: [null],
  });

  get kod() {
    return this.frm.get('kod');
  }
  get ad() {
    return this.frm.get('ad');
  }
  get birimId() {
    return this.frm.get('birimId');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }


  Kaydet() {


    this.data.ad = this.frm.value.ad;
    this.data.kod = this.frm.value.kod;
    this.data.birimId = this.selectedBirim?.id ? this.selectedBirim?.id : this.data.birimId;
    this.data.aciklama = this.frm.value.miktar;

    this.MasrafService.update(this.data, () => {
      this.activeModal.close();
    });
  }

  cikis() {
    this.activeModal.close(false);
  }



  BirimSelectModalComponent: any = BirimSelectModalComponents;
  selectedBirim: any;
  BirimChildFunc(event) {
    this.selectedBirim = event;
  }
}
