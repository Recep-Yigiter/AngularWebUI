import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateMasrafModel } from 'src/app/core/models/masraf/update-masraf-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { MasrafService } from 'src/app/core/services/repository/masraf.service';


@Component({
  selector: 'app-update-masraf',
  templateUrl: './update-masraf.component.html',
  styleUrls: ['./update-masraf.component.scss']
})
export class UpdateMasrafComponent implements OnInit {



  stateData: any;
  constructor(
    private fb: FormBuilder,
    private MasrafService: MasrafService,
    private router:Router,
    private BirimService:BirimService
  ) {

    this.stateData = history.state;
  }
  async ngOnInit() {

    this.BirimDataSource = (await this.BirimService.list()).items;

  }

  public frm: FormGroup= this.fb.group({

    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    birimId: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],

  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get birimId() { return this.frm.get('birimId') }
  get aciklama() { return this.frm.get('aciklama') }


  updateMasraf() {
    const createModel = new UpdateMasrafModel();
    createModel.id = this.stateData.id;
    createModel.ad = this.frm.value.ad ? this.frm.value.ad : this.stateData.ad;
    createModel.kod = this.frm.value.kod ? this.frm.value.kod : this.stateData.kod;
    createModel.hourId = this.stateData.hourId;

    this.MasrafService.update(createModel, () => {
      this.router.navigate(['/masraf/detail'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/masraf/detail'],{state:history.state})
  }

  selectedObject:any;
  BirimDataSource: any[]
  selectedBirim: any;
  changed(event) {
    this.selectedBirim = event
    if (this.BirimDataSource != undefined) {
      this.selectedObject = this.BirimDataSource.find((el: any) => {
        return el?.id == this.selectedBirim;
      });
    }
  }

}