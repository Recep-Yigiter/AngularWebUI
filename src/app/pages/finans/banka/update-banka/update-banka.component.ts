import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UpdateBirimModel } from 'src/app/core/models/birim/update-birim-model';
import { BankaService } from 'src/app/core/services/repository/banka.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-update-banka',
  templateUrl: './update-banka.component.html',
  styleUrls: ['./update-banka.component.scss']
})
export class UpdateBankaComponent implements OnInit {



  stateData: any;
  constructor(
    private fb: FormBuilder,
    private BankaService: BankaService,
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

    this.BankaService.update(createModel, () => {
      this.router.navigate(['/menu/finans/banka/detail'], { state: createModel })
    }, errorMessage => { })
  }
  vazgec(){
    this.router.navigate(['/menu/finans/banka/detail'],{state:history.state})
  }


  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any;
  rowData: any=[];

  colDefs: ColDef[] = [
    { field: "hesapNo", headerName: "Hesap No", width: 100, },
    { field: "hesapAdi", headerName: "Hesap Adı", width: 150 },
    { field: "hesapTuruAdi", headerName: "Hesap Türü", width: 350, },

  ];
}
