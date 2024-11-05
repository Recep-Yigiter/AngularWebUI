import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlinanCekService } from 'src/app/core/services/repository/alinan-cek.service';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';
import { BankaSelectModalComponents } from 'src/app/shared/utilities/modals/banka-selected-modal';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { KasaSelectModalComponents } from 'src/app/shared/utilities/modals/kasa-selected-modal';
import { SubeSelectModalComponents } from 'src/app/shared/utilities/modals/sube-selected-modal';

@Component({
  selector: 'app-update-alinan-cek',
  templateUrl: './update-alinan-cek.component.html',
  styleUrls: ['./update-alinan-cek.component.scss'],
  providers: [DatePipe],
})
export class UpdateAlinanCekComponent implements OnInit {
  @Input() data: any;
  dateTime: any = new Date();

  constructor(
    public activeModal: NgbActiveModal,
    private DatePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private AlinanCekService: AlinanCekService
  ) {
    this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
  }

createdDate: any = new Date();
valorDate: any = new Date();
vadeDate: any = new Date();
alinisDate: any = new Date();
  ngOnInit(): void {

    this.createdDate = this.DatePipe.transform(this.data.createdDate, 'yyyy-MM-dd');
    this.valorDate = this.DatePipe.transform(this.data.valorTarihi, 'yyyy-MM-dd');
    this.vadeDate = this.DatePipe.transform(this.data.vadeTarihi, 'yyyy-MM-dd');
    this.alinisDate = this.DatePipe.transform(this.data.alinisTarihi, 'yyyy-MM-dd');
  }



  public frm: FormGroup = this.fb.group({
    seri: [null, [Validators.required]],
    belgeNo: [null, [Validators.required]],
    referans: [null, [Validators.required]],
    alinisTarihi: [null, [Validators.required]],
    duzenlemeTarihi: [null, [Validators.required]],
    vadeTarihi: [null, [Validators.required]],
    valorTarihi: [null, [Validators.required]],
    tutar: [null, [Validators.required]],
    vergiNo: [null, [Validators.required]],
    vergiDairesi: [null, [Validators.required]],
    aciklama: [null, [Validators.required]],
    duzenleyen: [null, [Validators.required]],
    durum: [null, [Validators.required]],
    bankaId: [null, [Validators.required]],
    bankaAdi: [null, [Validators.required]],
    hesapNo: [null, [Validators.required]],
    cariId: [null, [Validators.required]],
    cariAdi: [null, [Validators.required]],
    subeId: [null, [Validators.required]],
    subeAdi: [null, [Validators.required]],
    kasaId: [null, [Validators.required]],
    kasaAdi: [null, [Validators.required]],
    iban: [null, [Validators.required]],
  });

  get seri() {
    return this.frm.get('seri');
  }
  get belgeNo() {
    return this.frm.get('belgeNo');
  }
  get referans() {
    return this.frm.get('referans');
  }
  get duzenlemeTarihi() {
    return this.frm.get('duzenlemeTarihi');
  }
  get alinisTarihi() {
    return this.frm.get('alinisTarihi');
  }
  get vadeTarihi() {
    return this.frm.get('vadeTarihi');
  }
  get valorTarihi() {
    return this.frm.get('valorTarihi');
  }
  get tutar() {
    return this.frm.get('tutar');
  }
  get vergiNo() {
    return this.frm.get('vergiNo');
  }
  get vergiDairesi() {
    return this.frm.get('vergiDairesi');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }
  get duzenleyen() {
    return this.frm.get('duzenleyen');
  }
  get durum() {
    return this.frm.get('durum');
  }
  get bankaId() {
    return this.frm.get('bankaId');
  }
  get bankaAdi() {
    return this.frm.get('bankaAdi');
  }
  get hesapNo() {
    return this.frm.get('hesapNo');
  }
  get cariId() {
    return this.frm.get('cariId');
  }
  get cariAdi() {
    return this.frm.get('cariAdi');
  }
  get subeId() {
    return this.frm.get('subeId');
  }
  get subeAdi() {
    return this.frm.get('subeAdi');
  }
  get kasaId() {
    return this.frm.get('kasaId');
  }
  get kasaAdi() {
    return this.frm.get('kasaAdi');
  }
  get iban() {
    return this.frm.get('iban');
  }

  Kaydet() {
    // this.frm.value.seri=""
    // this.frm.value.belgeNo=""
    // this.frm.value.referans=""
    // this.frm.value.duzenlemeTarihi=""
    // this.frm.value.alinisTarihi=""
    // this.frm.value.vadeTarihi=""
    // this.frm.value.valorTarihi=""
    // this.frm.value.tutar=""
    // this.frm.value.vergiNo=""
    // this.frm.value.vergiDairesi=""
    // this.frm.value.aciklama=""
    // this.frm.value.duzenleyen=""
    // this.frm.value.durum=""
    // this.frm.value.iban=""
    // this.frm.value.hesapNo=""
    this.frm.value.id=this.data.id
    this.frm.value.bankaId =this.selectedBanka?.id? this.selectedBanka?.id: this.data.bankaId;
    this.frm.value.bankaAdi =this.selectedBanka?.ad? this.selectedBanka?.ad: this.data.bankaAdi;
    this.frm.value.cariId = this.selectedCari?.id? this.selectedCari?.id: this.data.cariId;
    this.frm.value.cariAdi =  this.selectedCari?.ad? this.selectedCari?.ad: this.data.cariAdi;
    this.frm.value.subeId = this.selectedSube?.id? this.selectedSube?.id: this.data.subeId;
    this.frm.value.subeAdi = this.selectedSube?.ad? this.selectedSube?.ad: this.data.subeAdi;
    this.frm.value.kasaId = this.selectedKasa?.id? this.selectedKasa?.id: this.data.kasaId;
    this.frm.value.kasaAdi = this.selectedKasa?.ad;

    
    this.AlinanCekService.update(
      this.frm.value,
      () => {
        this.activeModal.close(true);
      },
      (errorMessage) => {}
    );
  }

  cikis() {
    this.activeModal.close(false);
  }

  CariSelectModalComponent: any = CariSelectModalComponents;
  selectedCari: any;
  CariChildFunc(event) {
    this.selectedCari = event;
  }

  KasaSelectModalComponent: any = KasaSelectModalComponents;
  selectedKasa: any;
  KasaChildFunc(event) {
    this.selectedKasa = event;
  }

  BankaSelectModalComponent: any = BankaSelectModalComponents;
  selectedBanka: any;
  BankaChildFunc(event) {
    this.selectedBanka = event;
  }

  SubeSelectModalComponent: any = SubeSelectModalComponents;

  selectedSube: any;
  SubeChildFunc(event) {
    this.selectedSube = event;
  }
}
