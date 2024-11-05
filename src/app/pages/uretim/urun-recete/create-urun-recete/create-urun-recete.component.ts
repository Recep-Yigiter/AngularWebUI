import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlinanCekService } from 'src/app/core/services/repository/alinan-cek.service';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { BankaSelectModalComponents } from 'src/app/shared/utilities/modals/banka-selected-modal';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { KasaSelectModalComponents } from 'src/app/shared/utilities/modals/kasa-selected-modal';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';
import { SubeSelectModalComponents } from 'src/app/shared/utilities/modals/sube-selected-modal';

@Component({
  selector: 'app-create-urun-recete',
  templateUrl: './create-urun-recete.component.html',
  styleUrls: ['./create-urun-recete.component.scss'],
  providers: [DatePipe],
})
export class CreateUrunReceteComponent implements OnInit {

  dateTime: any = new Date();

  selectedCari: any

  constructor(public activeModal: NgbActiveModal,
    private DatePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private UrunReceteService: UrunReceteService

  ) {
    this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');

  }
  ngOnInit(): void {
  }

  public frm: FormGroup = this.fb.group({
    ad: [null, [Validators.required,]],
    kod: [null, [Validators.required,]],
    stokId: [null, [Validators.required,]],
    stokAdi: [null, [Validators.required,]],
    stokKodu: [null, [Validators.required,]],
    birimAdi: [null, [Validators.required,]],

  })

  get ad() { return this.frm.get('ad') }
  get kod() { return this.frm.get('kod') }
  get stokId() { return this.frm.get('stokId') }
  get stokAdi() { return this.frm.get('stokAdi') }
  get stokKodu() { return this.frm.get('stokKodu') }
  get birimAdi() { return this.frm.get('birimAdi') }







  submit() {
    this.frm.value.stokId=this.selectedStok.id
    this.frm.value.stokAdi=this.selectedStok.ad
    this.frm.value.stokKodu=this.selectedStok.kod

    this.UrunReceteService.create(this.frm.value, () => {
      this.activeModal.close();

    }, errorMessage => {

    })

    console.log(this.frm.value);

  }







  close() {
    this.activeModal.close()
  }






selectedStok:any;
  StokChildFunc(event) {
    this.selectedStok=event

  }
  
  StokSelectModalComponent: any = StokSelectModalComponents;



 }
