import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UpdateBirimModel } from 'src/app/core/models/birim/update-birim-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { CariService } from 'src/app/core/services/repository/cari.service';

@Component({
  selector: 'app-update-cari',
  templateUrl: './update-cari.component.html',
  styleUrls: ['./update-cari.component.scss']
})
export class UpdateCariComponent implements OnInit {



  stateData: any;
  constructor(
    private fb: FormBuilder,
    private CariService: CariService,
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

    this.CariService.update(createModel, () => {
      this.router.navigate(['/menu/finans/cari/detail'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/menu/finans/cari/detail'],{state:history.state})
  }



}
