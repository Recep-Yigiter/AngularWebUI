import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepoService } from '../../../core/services/repository/depo.service';
import { Router } from '@angular/router';
import { UpdateDepoModel } from '../../../core/models/depo/update-depo-model';

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
      this.router.navigate(['/depo/detail'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/depo/detail'],{state:history.state})
  }



}
