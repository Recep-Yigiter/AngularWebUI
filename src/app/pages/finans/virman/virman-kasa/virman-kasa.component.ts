import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KasaHareketService } from 'src/app/core/services/repository/kasa-hareket.service';
import { KasaSelectModalComponents } from 'src/app/shared/utilities/modals/kasa-selected-modal';

@Component({
  selector: 'app-virman-kasa',
  templateUrl: './virman-kasa.component.html',
  styleUrls: ['./virman-kasa.component.scss']
})
export class VirmanKasaComponent implements OnInit {
  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private KasaHareketService: KasaHareketService
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

    borcluKasaId: [null, [Validators.required]],
    borcluKasaAdi: [null, [Validators.required]],
    alacakliKasaId: [null, [Validators.required]],
    alacakliKasaAdi: [null, [Validators.required]],

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
  get borcluKasaId() {
    return this.frm.get('borcluKasaId');
  }
  get borcluKasaAdi() {
    return this.frm.get('borcluKasaAdi');
  }
  get alacakliKasaId() {
    return this.frm.get('alacakliKasaId');
  }
  get alacakliKasaAdi() {
    return this.frm.get('alacakliKasaAdi');
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
    let KasaHarekets = [
      {
        kasaId: this.selectedAlacakliKasa.id,
        karsiHesap: 'Kasa',
        karsiHesapAdi: this.selectedBorcluKasa.ad,
        karsiHesapKodu: this.selectedBorcluKasa.kod,
        islemTarihi: this.frm.value.belgeTarihi,
        islem: 15,
        seriNo: this.frm.value.seriNo,
        borc: 0,
        alacak: Number(this.frm.value.tutar),
        aciklama: this.frm.value.aciklama,
      },
      {
        kasaId: this.selectedBorcluKasa.id,
        karsiHesap: 'Kasa',
        karsiHesapAdi: this.selectedAlacakliKasa.ad,
        karsiHesapKodu: this.selectedAlacakliKasa.kod,
        islemTarihi: this.frm.value.belgeTarihi,
        islem: 15,
        seriNo: this.frm.value.seriNo,
        borc: Number(this.frm.value.tutar),
        alacak:0,
        aciklama: this.frm.value.aciklama,
      },
      
    ];

    KasaHarekets.forEach(async (KasaHareket) => {
 
      await this.KasaHareketService.create(KasaHareket, () => {
        this.activeModal.close(false);
      });
    });
  }

  cikis() {
    this.activeModal.close(false);
  }

  KasaSelectModalComponent: any = KasaSelectModalComponents;
  selectedBorcluKasa: any;
  selectedAlacakliKasa: any;
  BorcluKasaChildFunc(event) {
    this.selectedBorcluKasa = event;
  }

  AlacakliKasaChildFunc(event) {
    this.selectedAlacakliKasa = event;
  }
}
