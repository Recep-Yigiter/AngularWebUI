import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateMasrafModel } from 'src/app/core/models/masraf/create-masraf-model';
import { MasrafService } from 'src/app/core/services/repository/masraf.service';
import { BirimSelectModalComponents } from 'src/app/shared/utilities/modals/birim-selected-modal';




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
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {}

  public frm: FormGroup = this.fb.group({
    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    birimId: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
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
    const createModel = new CreateMasrafModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.birimId = this.selectedBirim?.id;
    createModel.hourId = String(new Date().valueOf());

    this.MasrafService.create(
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




  BirimSelectModalComponent: any = BirimSelectModalComponents;
  selectedBirim: any;
  BirimChildFunc(event) {
    this.selectedBirim = event;
  }



}
