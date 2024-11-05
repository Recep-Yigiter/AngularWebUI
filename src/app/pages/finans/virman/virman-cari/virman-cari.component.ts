import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CariHareketService } from 'src/app/core/services/repository/cari-hareket.service';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';

@Component({
  selector: 'app-virman-cari',
  templateUrl: './virman-cari.component.html',
  styleUrls: ['./virman-cari.component.scss'],
})
export class VirmanCariComponent implements OnInit {
  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private CariHareketService: CariHareketService
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

    borcluCariId: [null, [Validators.required]],
    borcluCariAdi: [null, [Validators.required]],
    alacakliCariId: [null, [Validators.required]],
    alacakliCariAdi: [null, [Validators.required]],

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
  get borcluCariId() {
    return this.frm.get('borcluCariId');
  }
  get borcluCariAdi() {
    return this.frm.get('borcluCariAdi');
  }
  get alacakliCariId() {
    return this.frm.get('alacakliCariId');
  }
  get alacakliCariAdi() {
    return this.frm.get('alacakliCariAdi');
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
    let cariHarekets = [
   
      {
        cariId: this.selectedAlacakliCari.id,
        karsiHesap: 'Cari',
        karsiHesapAdi: this.selectedBorcluCari.ad,
        karsiHesapKodu: this.selectedBorcluCari.kod,
        islemTarihi: this.frm.value.belgeTarihi,
        islem: 13,
        seriNo: this.frm.value.seriNo,
        borc: 0,
        alacak: Number(this.frm.value.tutar),
        aciklama: this.frm.value.aciklama,
      },
      {
        cariId: this.selectedBorcluCari.id,
        karsiHesap: 'Cari',
        karsiHesapAdi: this.selectedAlacakliCari.ad,
        karsiHesapKodu: this.selectedAlacakliCari.kod,
        islemTarihi: this.frm.value.belgeTarihi,
        islem: 13,
        seriNo: this.frm.value.seriNo,
        borc: Number(this.frm.value.tutar),
        alacak:0,
        aciklama: this.frm.value.aciklama,
      }
    ];

    cariHarekets.forEach(async (cariHareket) => {
 
      await this.CariHareketService.create(cariHareket, () => {
        this.activeModal.close(false);
      });
    });
  }

  cikis() {
    this.activeModal.close(false);
  }

  CariSelectModalComponent: any = CariSelectModalComponents;
  selectedBorcluCari: any;
  selectedAlacakliCari: any;
  BorcluCariChildFunc(event) {
    this.selectedBorcluCari = event;
  }

  AlacakliCariChildFunc(event) {
    this.selectedAlacakliCari = event;
  }
}
