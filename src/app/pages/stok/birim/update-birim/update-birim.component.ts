import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { BirimService } from '../core/services/birim.service';
import { UpdateBirimModel } from '../core/models/update-birim-model';

@Component({
  selector: 'app-update-birim',
  templateUrl: './update-birim.component.html',
  styleUrls: ['./update-birim.component.scss']
})
export class UpdateBirimComponent implements OnInit {



  stateData: any;
  constructor(
    private fb: FormBuilder,
    private BirimService: BirimService,
    private router:Router
  ) {

    this.stateData = history.state;
  }
  async ngOnInit() {



  }

  public frm: FormGroup= this.fb.group({

    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],

  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get aciklama() { return this.frm.get('aciklama') }


  update() {
    const createModel = new UpdateBirimModel();
    createModel.id = this.stateData.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.stateData.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.stateData.kod;
    createModel.hourId = this.stateData.hourId;

    this.BirimService.update(createModel, () => {
      this.router.navigate(['/pages/birim/detail-birim'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/pages/birim/detail-birim'],{state:history.state})
  }



}
