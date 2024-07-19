import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBirimModel } from 'src/app/core/models/birim/create-birim-model';
import { CreateCariModel } from 'src/app/core/models/cari/create-cari-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { CariService } from 'src/app/core/services/repository/cari.service';

@Component({
  selector: 'app-create-cari',
  templateUrl: './create-cari.component.html',
  styleUrls: ['./create-cari.component.scss']
})
export class CreateCariComponent implements OnInit {
  /**
   *
   */
  constructor(private fb: FormBuilder, private router: Router,private CariService:CariService) {


  }
  ngOnInit(): void {

  }

  public frm: FormGroup = this.fb.group({

    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],

  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }



 

  createCari() {

    const createModel = new CreateCariModel();
    createModel.ad=this.frm.value.ad;
    createModel.kod=this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());


    this.CariService.create(createModel, () => {
      this.router.navigate(['/menu/finans/cari/detail'], { state: createModel })
    }, errorMessage => {
      
     })



  }
}
