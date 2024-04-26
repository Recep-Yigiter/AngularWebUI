import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IsMerkeziService } from '../../../is-merkezi/core/services/is-merkezi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-operasyon-select-modal',
  templateUrl: './operasyon-select-modal.component.html',
  styleUrls: ['./operasyon-select-modal.component.scss']
})
export class OperasyonSelectModalComponent implements OnInit {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal,private fb:FormBuilder,
    private IsMerkeziService: IsMerkeziService) {

  }
  ngOnInit(): void {
    this.getList();
  }
  public frm: FormGroup = this.fb.group({

    operasyonAdi: [null, [Validators.required, Validators.maxLength(16)]],
    isMerkeziId: [null, [Validators.required, Validators.maxLength(16)]],
    calismaZamani: [null, [Validators.required, Validators.maxLength(16)]],
  

  })

  get operasyonAdi() { return this.frm.get('operasyonAdi') }
  get isMerkeziId() { return this.frm.get('isMerkeziId') }
  get calismaZamani() { return this.frm.get('calismaZamani') }
 



  async getList() {

    this.IsMerkeziDataSource = (await this.IsMerkeziService.GetList(() => { })).data.items;
  }
  selectedRows: any;
  onSelectionChanged() {

    var IsMerkezi = {
      
      ad: this.frm.value.operasyonAdi,
      isMerkeziId: this.frm.value.isMerkeziId.id,
      isMerkeziAdi: this.frm.value.isMerkeziId.ad,
      isMerkeziKodu: this.frm.value.isMerkeziId.kod,
      urunReceteId: this.frm.value.isMerkeziId.urunReceteId,
      aciklama:null
    
   
    }
   this.activeModal.close(IsMerkezi)
  }












  selectedIsMerkezi: any;
  IsMerkeziDataSource: any[];
  changed(event) {

    this.selectedIsMerkezi = event;

  }






}
