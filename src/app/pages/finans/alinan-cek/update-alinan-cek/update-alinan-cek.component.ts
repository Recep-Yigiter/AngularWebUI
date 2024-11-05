import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';

@Component({
  selector: 'app-update-alinan-cek',
  templateUrl: './update-alinan-cek.component.html',
  styleUrls: ['./update-alinan-cek.component.scss']
})
export class UpdateAlinanCekComponent implements OnInit {

  dateTime: any = new Date();
  stateData:any;
  selectedCari: any

  constructor(public activeModal: NgbActiveModal, private DatePipe: DatePipe, private fb: FormBuilder, private modalService: NgbModal,) {
    this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
    this.stateData = history.state;
  }
  ngOnInit(): void {

  }

  public frm: FormGroup = this.fb.group({



    seri: [null, [Validators.required,]],
    belgeNo: [null, [Validators.required,]],
    referans: [null, [Validators.required,]],
    alinisTarihi: [null, [Validators.required,]],
    duzenlemeTarihi: [null, [Validators.required,]],
    vadeTarihi: [null, [Validators.required,]],
    valorTarihi: [null, [Validators.required,]],
    tutar: [null, [Validators.required,]],
    vergiNo: [null, [Validators.required,]],
    vergiDairesi: [null, [Validators.required,]],
    aciklama: [null, [Validators.required,]],
    duzenleyen: [null, [Validators.required,]],
    durum: [null, [Validators.required,]],
    bankaId: [null, [Validators.required,]],
    bankaAdi: [null, [Validators.required,]],
    hesapNo: [null, [Validators.required,]],
    cariId: [null, [Validators.required,]],
    cariAdi: [null, [Validators.required,]],
    subeId: [null, [Validators.required,]],
    subeAdi: [null, [Validators.required,]],
    csKasasi: [null, [Validators.required,]],
    csKasasiAdi: [null, [Validators.required,]],
    iban: [null, [Validators.required,]],
  })

  get seri() { return this.frm.get('seri') }
  get belgeNo() { return this.frm.get('belgeNo') }
  get referans() { return this.frm.get('referans') }
  get duzenlemeTarihi() { return this.frm.get('duzenlemeTarihi') }
  get alinisTarihi() { return this.frm.get('alinisTarihi') }
  get vadeTarihi() { return this.frm.get('vadeTarihi') }
  get valorTarihi() { return this.frm.get('valorTarihi') }
  get tutar() { return this.frm.get('tutar') }
  get vergiNo() { return this.frm.get('vergiNo') }
  get vergiDairesi() { return this.frm.get('vergiDairesi') }
  get aciklama() { return this.frm.get('aciklama') }
  get duzenleyen() { return this.frm.get('duzenleyen') }
  get durum() { return this.frm.get('durum') }
  get bankaId() { return this.frm.get('bankaId') }
  get bankaAdi() { return this.frm.get('bankaAdi') }
  get hesapNo() { return this.frm.get('hesapNo') }
  get cariId() { return this.frm.get('cariId') }
  get cariAdi() { return this.frm.get('cariAdi') }
  get subeId() { return this.frm.get('subeId') }
  get subeAdi() { return this.frm.get('subeAdi') }
  get csKasasi() { return this.frm.get('csKasasi') }
  get csKasasiAdi() { return this.frm.get('csKasasiAdi') }
  get iban() { return this.frm.get('iban') }






  submit() {



console.log(this.frm.value);
    // this.activeModal.close(this.frm.value);

  }







  close() {
    this.activeModal.close()
  }


  cariSelectModal() {
    const modalRef = this.modalService.open(CariSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((depo) => {
      this.selectedCari = depo;

    });

  }








}
