import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HizmetService } from '../core/services/hizmet.service';
import { UpdateHizmetModel } from '../core/models/update-hizmet-model';

@Component({
  selector: 'app-update-hizmet',
  templateUrl: './update-hizmet.component.html',
  styleUrls: ['./update-hizmet.component.scss']
})
export class UpdateHizmetComponent {



  stateData: any;
  constructor(
    private fb: FormBuilder,
    private HizmetService: HizmetService,
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


  updateHizmet() {
    const createModel = new UpdateHizmetModel();
    createModel.id = this.stateData.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.stateData.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.stateData.kod;
    createModel.hourId = this.stateData.hourId;

    this.HizmetService.update(createModel, () => {
      this.router.navigate(['/hizmet/detail'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/hizmet/detail'],{state:history.state})
  }



}
