import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankaHesapHareketService } from 'src/app/core/services/repository/banka-hesap-hareket.service';
import { BankaHesapSelectModalComponents } from 'src/app/shared/utilities/modals/banka-hesap-selected-modal';

@Component({
  selector: 'app-virman-banka',
  templateUrl: './virman-banka.component.html',
  styleUrls: ['./virman-banka.component.scss']
})
export class VirmanBankaComponent implements OnInit {
  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private BankaHesapHareketService: BankaHesapHareketService
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }

  public frm: FormGroup = this.fb.group({
    islemTuru: [null, [Validators.required]],
    seriNo: [null, [Validators.required]],
    belgeNo: [null, [Validators.required]],
    referansNo: [null, [Validators.required]],
    belgeTarihi: [null, [Validators.required]],
    valorTarihi: [null, [Validators.required]],

    borcluBankaId: [null, [Validators.required]],
    borcluBankaAdi: [null, [Validators.required]],
    borcluBankaIban: [null, [Validators.required]],

    alacakliBankaId: [null, [Validators.required]],
    alacakliBankaAdi: [null, [Validators.required]],
    alacakliBankaIban: [null, [Validators.required]],


    tutar: [null, [Validators.required]],
    duzenleyen: [null, [Validators.required]],
    teslimAlan: [null, [Validators.required]],
    aciklama: [null, [Validators.required]],
  });

  get islemTuru() {
    return this.frm.get('islemTuru');
  }
  get seriNo() {
    return this.frm.get('seriNo');
  }
  get belgeNo() {
    return this.frm.get('belgeNo');
  }
  get referansNo() {
    return this.frm.get('referansNo');
  }
  get belgeTarihi() {
    return this.frm.get('belgeTarihi');
  }
  get valorTarihi() {
    return this.frm.get('valorTarihi');
  }
  get borcluBankaId() {
    return this.frm.get('borcluBankaId');
  }
  get borcluBankaAdi() {
    return this.frm.get('borcluBankaAdi');
  }
  get borcluBankaIban() {
    return this.frm.get('borcluBankaIban');
  }
  get alacakliBankaId() {
    return this.frm.get('alacakliBankaId');
  }
  get alacakliBankaAdi() {
    return this.frm.get('alacakliBankaAdi');
  }
  get alacakliBankaIban() {
    return this.frm.get('alacakliBankaIban');
  }
  get tutar() {
    return this.frm.get('tutar');
  }
  get duzenleyen() {
    return this.frm.get('duzenleyen');
  }
  get teslimAlan() {
    return this.frm.get('teslimAlan');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }

  async Kaydet() {
    let BankaHarekets = [
   
      {
        BankaHesapId: this.selectedAlacakliBanka.id,
        karsiHesap: 'Banka',
        karsiHesapAdi: this.selectedBorcluBanka.hesapAdi,
        karsiHesapKodu: this.selectedBorcluBanka.hesapNo,
        islemTarihi: this.frm.value.belgeTarihi,
        islem: 14,
        seriNo: this.frm.value.seriNo,
        borc: 0,
        alacak: Number(this.frm.value.tutar),
        aciklama: this.frm.value.aciklama,
      },
      {
        BankaHesapId: this.selectedBorcluBanka.id,
        karsiHesap: 'Banka',
        karsiHesapAdi: this.selectedAlacakliBanka.hesapAdi,
        karsiHesapKodu: this.selectedAlacakliBanka.hesapNo,
        islemTarihi: this.frm.value.belgeTarihi,
        islem: 14,
        seriNo: this.frm.value.seriNo,
        borc: Number(this.frm.value.tutar),
        alacak:0,
        aciklama: this.frm.value.aciklama,
      }
    ];

    BankaHarekets.forEach(async (BankaHareket) => {
 
      await this.BankaHesapHareketService.create(BankaHareket, () => {
        this.activeModal.close(false);
      });
    });
  }

  cikis() {
    this.activeModal.close(false);
  }

  BankaSelectModalComponent: any = BankaHesapSelectModalComponents;
  selectedBorcluBanka: any;
  selectedAlacakliBanka: any;
  BorcluBankaChildFunc(event) {
    this.selectedBorcluBanka = event;
    console.log(this.selectedBorcluBanka)
  }

  AlacakliBankaChildFunc(event) {
    this.selectedAlacakliBanka = event;
  }
}
