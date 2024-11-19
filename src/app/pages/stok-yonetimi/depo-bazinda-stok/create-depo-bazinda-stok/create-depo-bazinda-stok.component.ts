import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepoBazindaStokService } from 'src/app/core/services/repository/depo-bazinda-stok.service';
import { DepoSelectModalComponents } from 'src/app/shared/utilities/modals/depo-selected-modal';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';

@Component({
  selector: 'app-create-depo-bazinda-stok',
  templateUrl: './create-depo-bazinda-stok.component.html',
  styleUrls: ['./create-depo-bazinda-stok.component.scss'],
})
export class CreateDepoBazindaStokComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private DepoBazindaStokService: DepoBazindaStokService
  ) {}
  ngOnInit(): void {}

  public frm: FormGroup = this.fb.group({
    depoId: [null],
    stokId: [null],
    miktar: [null],
  });

  get miktar() {
    return this.frm.get('miktar');
  }
  get depoId() {
    return this.frm.get('depoId');
  }
  get stokId() {
    return this.frm.get('stokId');
  }
  Kaydet() {
    this.frm.value.depoId = this.selectedDepo?.id;
    this.frm.value.stokId = this.selectedStok?.id;
    this.frm.value.miktar = this.frm.value.miktar;

    this.DepoBazindaStokService.create(this.frm.value, () => {
      this.activeModal.close();
    });
  }

  cikis() {this.activeModal.close(false)}

  DepoSelectModalComponent: any = DepoSelectModalComponents;
  selectedDepo: any;
  DepoChildFunc(event) {
    this.selectedDepo = event;
    
  }

  StokSelectModalComponent: any = StokSelectModalComponents;
  selectedStok: any;
  StokChildFunc(event) {
    this.selectedStok = event;
  }
}
