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
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ILargeTextEditorParams,
  IRichCellEditorParams,
  ISelectCellEditorParams,
  ITextCellEditorParams,
  ModuleRegistry,
  ValueFormatterParams,
  createGrid,
} from 'ag-grid-community';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { CekSenetService } from 'src/app/core/services/repository/cek-senet.service';
import { CekSenetHareketService } from 'src/app/core/services/repository/cek-senet-hareket.service';
import { BankaHareketService } from 'src/app/core/services/repository/banka-hareket.service';
import { cekSenetTipi } from '../../create-cek-senet/create-cek-senet.component';
import { KasaHareketService } from 'src/app/core/services/repository/kasa-hareket.service';
import { BankaHesapSelectModalComponents } from 'src/app/shared/utilities/modals/banka-hesap-selected-modal';
import { BankaHesapHareketService } from 'src/app/core/services/repository/banka-hesap-hareket.service';

@Component({
  selector: 'app-bankadan-tahsil-kasa',
  templateUrl: './bankadan-tahsil-kasa.component.html',
  styleUrls: ['./bankadan-tahsil-kasa.component.scss'],
  providers: [DatePipe, CurrencyPipe],
})
export class BankadanTahsilKasaComponent implements OnInit {
  @Input() data: any;
  dateTime: any = new Date();

  constructor(
    public activeModal: NgbActiveModal,
    private DatePipe: DatePipe,
    private fb: FormBuilder,
    private CekSenetHareketService: CekSenetHareketService,
    private BankaHesapHareketService: BankaHesapHareketService,
    private CekSenetService: CekSenetService,
    private KasaHareketService: KasaHareketService
  ) {
    this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');
  }
  ngOnInit(): void {}

  public frm: FormGroup = this.fb.group({
    islemTarihi: [null, [Validators.required]],
    karsiHesap: [null, [Validators.required]],
    karsiHesapAdi: [null, [Validators.required]],
    karsiHesapKodu: [null, [Validators.required]],
  });

  get islemTarihi() {
    return this.frm.get('islemTarihi');
  }

  get karsiHesap() {
    return this.frm.get('karsiHesap');
  }

  get karsiHesapAdi() {
    return this.frm.get('karsiHesapAdi');
  }

  get karsiHesapKodu() {
    return this.frm.get('karsiHesapKodu');
  }

  async Kaydet() {
    let cekHareket = {
      cekSenetId: this.data.id,
      islemTarihi: this.frm.value.islemTarihi,
      islem: 11,
      karsiHesap: 'Kasa',
      karsiHesapAdi: this.selectedKasa.ad,
      karsiHesapKodu: this.selectedKasa.kod,
      aciklama: '',
    };

    await this.CekSenetHareketService.create(cekHareket, () => {
      this.cekSenetUpdate();
    });
  }

  cekSenetUpdate() {
    let updateCekSenet = {
      id: this.data.id,
      durum: 5,
      cekSenetTipi: this.data.cekSenetTipi,
      seriNo: this.data.seriNo,
      islemNo: this.data.islemNo,
      vadeTarihi: this.data.vadeTarihi,
      alinisTarihi: this.data.alinisTarihi,
      cariId: this.data.cariId,
      ciro: this.data.ciro,
      ilkSahibi: this.data.ilkSahibi,
      tutar: this.data.tutar,
      banka: this.data.banka,
      bankaSube: this.data.bankaSube,
      sehir: this.data.sehir,
      hesapNo: this.data.hesapNo,
      aciklama: this.data.aciklama,
    };
    this.CekSenetService.update(updateCekSenet, () => {
      this.createBankaHesapHareket();
    });
  }

  createBankaHesapHareket() {
    const bankaHesapHareket = {
      bankaHesapId: this.data.cekSenetHareketler.filter((c) => c.karsiHesap == 'Banka')[0].karsiHesapId,
      karsiHesap: 'Kasa',
      karsiHesapAdi: this.selectedKasa.ad,
      karsiHesapKodu: this.selectedKasa.kod,
      islem: 11, //Bankadan Tahsil (Kasa) (Enum)
      islemTarihi: this.frm.value.islemTarihi,
      seriNo: this.data.seriNo,
      borc: 0,
      alacak: this.data.tutar,
      aciklama:
        this.data.seriNo +
        ' ' +
        `${
          this.data.cekSenetTipi == 1
            ? 'Alınan Çek'
            : this.data.cekSenetTipi == 2
            ? 'Alınan Senet'
            : this.data.cekSenetTipi == 3
            ? 'Verilen Çek'
            : this.data.cekSenetTipi == 4
            ? 'Verilen Senet'
            : ''
        }` +
        `[ Bankadan Tahsil (Kasa) ]`,
    };

    this.BankaHesapHareketService.create(bankaHesapHareket, () => {
      this.createKasaHareket();
    });
  }

  createKasaHareket() {
    const kasaHareket = {
      kasaId: this.selectedKasa.id,
      karsiHesap: 'Banka', //karşı hesap
      karsiHesapAdi: this.data.cekSenetHareketler.filter(
        (c) => c.karsiHesap == 'Banka'
      )[0].karsiHesapAdi,
      karsiHesapKodu: this.data.cekSenetHareketler.filter(
        (c) => c.karsiHesap == 'Banka'
      )[0].karsiHesapKodu,
      islem: 11, //Kasadan Tahsil Edildi (Enum)
      islemTarihi: this.frm.value.islemTarihi,
      seriNo: this.data.seriNo,
      borc: this.data.tutar,
      alacak: 0,
      aciklama:
        this.data.seriNo +
        '-' +
        `${
          this.data.cekSenetTipi == 1
            ? 'Alınan Çek'
            : this.data.cekSenetTipi == 2
            ? 'Alınan Senet'
            : this.data.cekSenetTipi == 3
            ? 'Verilen Çek'
            : this.data.cekSenetTipi == 4
            ? 'Verilen Senet'
            : ''
        }` +
        `[ Bankadan Tahsil (Kasa) ]`,
    };

    this.KasaHareketService.create(kasaHareket, () => {
      this.activeModal.close(true);
    });
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

  BankaHesapSelectModalComponent: any = BankaHesapSelectModalComponents;
  selectedBankaHesap: any;
  BankaHesapChildFunc(event) {
    this.selectedBankaHesap = event;
  }

  SubeSelectModalComponent: any = SubeSelectModalComponents;

  selectedSube: any;
  SubeChildFunc(event) {
    this.selectedSube = event;
  }
}
