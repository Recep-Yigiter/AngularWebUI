import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UpdateDepoModel } from 'src/app/core/models/depo/update-depo-model';
import { DepoService } from 'src/app/core/services/repository/depo.service';


@Component({
  selector: 'app-update-depo',
  templateUrl: './update-depo.component.html',
  styleUrls: ['./update-depo.component.scss']
})
export class UpdateDepoComponent implements OnInit {



  stateData: any;
  constructor(
    private fb: FormBuilder,
    private DepoService: DepoService,
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


  updateDepo() {
    const createModel = new UpdateDepoModel();
    createModel.id = this.stateData.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.stateData.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.stateData.kod;
    createModel.hourId = this.stateData.hourId;

    this.DepoService.update(createModel, () => {
      this.router.navigate(['/menu/malzeme-yonetimi/depo/detail'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/menu/malzeme-yonetimi/depo/detail'],{state:history.state})
  }



}
