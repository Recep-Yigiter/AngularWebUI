import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-banka-hesap-modal',
  templateUrl: './create-banka-hesap-modal.component.html',
  styleUrls: ['./create-banka-hesap-modal.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class CreateBankaHesapModalComponent implements OnInit {

  dateTime: any = new Date();
  favoriteSeason: string;

  dovizSelectedDisabled: boolean = true;
  selectedOption: number;
  selectedHesaptur: any;
  selectedDovizCins: any;
  defaultFaiz: any = 0
  defaultKomisyon: any = 0


  constructor(public activeModal: NgbActiveModal, private DatePipe: DatePipe, private fb: FormBuilder) {
    this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
    this.selectedOption = this.radioButtonOptions[0].paraBirimiAdi;
    this.selectedDovizCins = this.dovizCinsleri[0];
  }
  ngOnInit(): void {

  }

  public frm: FormGroup = this.fb.group({

    hesapNo: [null, [Validators.required,]],
    hesapAdi: [null, [Validators.required,]],
    ibanNo: [null, ],
    hesapTuru: [null,Validators.required],
    mutabakatTarihi: [null, [Validators.required,]],
    emkbBankaKodu: [null],
    emkbSubeKodu: [null],
    musteriNo: [null],
    faiz: [null,Validators.required],
    komisyon: [null,Validators.required],
    paraBirimi: [null,],
    dovizCinsi: [null,],
  })

  get hesapNo() { return this.frm.get('hesapNo') }
  get hesapAdi() { return this.frm.get('hesapAdi') }
  get ibanNo() { return this.frm.get('ibanNo') }
  get hesapTuru() { return this.frm.get('hesapTuru') }
  get mutabakatTarihi() { return this.frm.get('mutabakatTarihi') }
  get emkbBankaKodu() { return this.frm.get('emkbBankaKodu') }
  get emkbSubeKodu() { return this.frm.get('emkbSubeKodu') }
  get musteriNo() { return this.frm.get('musteriNo') }
  get faiz() { return this.frm.get('faiz') }
  get komisyon() { return this.frm.get('komisyon') }
  get paraBirimi() { return this.frm.get('paraBirimi') }
  get dovizCinsi() { return this.frm.get('dovizCinsi') }

  get f(): { [key: string]: AbstractControl } {
    return this.frm.controls;
  }

  submitted = false;

  submit() {

    // if (this.frm.value.paraBirimi == "TL") {
    //   this.frm.value.dovizCinsi = "TL" 
    // }
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
    
this.activeModal.close(this.frm.value);

  }







  close() {
    this.activeModal.close()
  }

  Hesapturleri: any = [
    { hesapTuru: 1, hesapTuruAdi: "Vadeli Mevduat" },
    { hesapTuru: 2, hesapTuruAdi: "Vadesiz Mevduat" },
    { hesapTuru: 3, hesapTuruAdi: "Yatirim" },
    { hesapTuru: 4, hesapTuruAdi: "Ticari" },
    { hesapTuru: 5, hesapTuruAdi: "Nakdi" },
    { hesapTuru: 6, hesapTuruAdi: "Gayri Nakdi Kredi" },
  ];
  dovizCinsleri: any = [
    { dovizCinsi: 1, dovizCinsiAdi: "USD" },
    { dovizCinsi: 2, dovizCinsiAdi: "EURO" },

  ];
  radioButtonOptions: any[] = [
    { paraBirimi: 1, paraBirimiAdi: "TL", checked: true },
    { paraBirimi: 2, paraBirimiAdi: "Döviz", checked: false },
  ];


  changed(event) {

    this.selectedHesaptur = event;

  }

  changedDovizCins(event) {
    this.selectedDovizCins = event

  }

  changeParaBirimi(event) {

    if (event.value == "Döviz") {
      this.dovizSelectedDisabled = false;
    } else {
      this.dovizSelectedDisabled = true;
    }
  }
}
