import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { CreateUretimEmriModel } from '../core/models/create-uretim-emri-model';
import { DeleteButtonComponent } from '../../urun-recete/components/delete-button/delete-button.component';
import { StokSelectModalComponent } from '../../urun-recete/components/stok-select-modal/stok-select-modal.component';
import { OperasyonSelectModalComponent } from '../../urun-recete/components/operasyon-select-modal/operasyon-select-modal.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { UrunReceteSelectModalComponents } from 'src/app/shared/utilities/modals/urun-recete-selected-modal';
import { UretimEmriService } from 'src/app/core/services/repository/uretim-emri.service';
import { DepoBazindaStokService } from 'src/app/core/services/repository/depo-bazinda-stok.service';
import { DepoSelectModalComponents } from 'src/app/shared/utilities/modals/depo-selected-modal';

@Component({
  selector: 'app-update-uretim-emri',
  templateUrl: './update-uretim-emri.component.html',
  styleUrls: ['./update-uretim-emri.component.scss'],
  providers: [CurrencyPipe, DatePipe],
})
export class UpdateUretimEmriComponent implements OnInit {
  @Input() data;
  dateTimeSiparisTarihi: any = new Date();
  dateTimeTeslimTarihi: any = new Date();
  dateTimeSevkTarihi: any = new Date();

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private UretimEmriService: UretimEmriService,
    private UrunReceteService: UrunReceteService,
    private DepoBazindaStokService: DepoBazindaStokService,
    private DatePipe: DatePipe
  ) {}
  ngOnInit() {
    console.log(this.data);
    this.dateTimeSiparisTarihi = this.DatePipe.transform(
      this.data.siparisTarihi,
      'yyyy-MM-dd'
    );
    this.dateTimeTeslimTarihi = this.DatePipe.transform(
      this.data.teslimTarihi,
      'yyyy-MM-dd'
    );
    this.dateTimeSevkTarihi = this.DatePipe.transform(
      this.data.sevkTarihi,
      'yyyy-MM-dd'
    );
    this.data.uretimDurumuId = '1';
    if (this.data.uretimDurumu == 'Beklemede') {
      this.data.uretimDurumuId = '1';
    } else if (this.data.uretimDurumu == 'Üretiliyor') {
      this.data.uretimDurumuId = '2';
    } else {
      this.data.uretimDurumuId = '3';
    }
  }

  public frm: FormGroup = this.fb.group({
    siparisTarihi: [null],
    teslimTarihi: [null],
    sevkTarihi: [null],
    referans: [null],
    urunReceteId: [null],
    urunReceteKodu: [null],
    miktar: [null],
    cariId: [null],
    depoId: [null],
    cariKodu: [null],
    uretimDurumu: [null],
    uretimDurumuId: [null],
  });

  get uretimDurumuId() {
    return this.frm.get('uretimDurumuId');
  }
  get siparisTarihi() {
    return this.frm.get('siparisTarihi');
  }
  get teslimTarihi() {
    return this.frm.get('teslimTarihi');
  }
  get sevkTarihi() {
    return this.frm.get('sevkTarihi');
  }
  get referans() {
    return this.frm.get('referans');
  }
  get urunReceteId() {
    return this.frm.get('urunReceteId');
  }
  get urunReceteKodu() {
    return this.frm.get('urunReceteKodu');
  }
  get miktar() {
    return this.frm.get('miktar');
  }
  get cariId() {
    return this.frm.get('cariId');
  }
  get depoId() {
    return this.frm.get('depoId');
  }
  get cariKodu() {
    return this.frm.get('cariKodu');
  }
  get uretimDurumu() {
    return this.frm.get('uretimDurumu');
  }

  dataSourceUretimDurumu: any = [
    { ad: 'Beklemede', id: '1' },
    { ad: 'Üretiliyor', id: '2' },
    { ad: 'Sevk Edildi', id: '3' },
  ];

  CariSelectModalComponent: any = CariSelectModalComponents;
  DepoSelectModalComponent: any = DepoSelectModalComponents;
  UrunReceteSelectModalComponent: any = UrunReceteSelectModalComponents;
  async submit() {
    this.frm.value.id = this.data.id;
    this.frm.value.uretimDurumu = this.selectedObject?.ad
      ? this.selectedObject.ad
      : this.data.uretimDurumu;
    this.frm.value.urunReceteId = this.selectedUrunRecete?.ad
      ? this.selectedUrunRecete.ad
      : this.data.urunReceteId;
    this.frm.value.cariId = this.selectedCari?.id
      ? this.selectedCari?.id
      : this.data.cariId;
    this.frm.value.hourId = String(new Date().valueOf());
    this.frm.value.depoId = this.data.depoId;

    if (!this.selectedUrunRecete) {
      let urunReceteData = await this.UrunReceteService.getById(
        this.data.urunReceteId,
        () => {},
        (errorMessage) => {}
      );
      this.frm.value.urunRecete = urunReceteData;
    } else {
      this.frm.value.urunRecete = this.selectedUrunRecete;
    }

    this.UretimEmriService.update(
      this.frm.value,
      () => {
        if (this.data.uretimDurumu == 'Beklemede') {
          this.depoBazindaStokGuncelle(this.frm.value);
        }

        this.activeModal.close();
      },
      (errorMessage) => {}
    );
  }

  selectedCari: any;
  CariChildFunc(event) {
    this.selectedCari = event;
  }
  selectedDepo: any;
  DepoChildFunc(event) {
    this.selectedDepo = event;
  }
  selectedUrunRecete: any;
  UrunReceteChildFunc(event) {
    this.selectedUrunRecete = event;
  }

  selectedObject: any;
  selectedUretimDurumu: any;
  changed(event) {
    this.selectedUretimDurumu = event;
    if (this.dataSourceUretimDurumu != undefined) {
      this.selectedObject = this.dataSourceUretimDurumu.find((el: any) => {
        return el?.id == this.selectedUretimDurumu;
      });
    }
  }

  async depoBazindaStokGuncelle(event) {
    let depoBazindaStoklar = (
      await this.DepoBazindaStokService.GetList()
    ).items.filter((c) => c.depoId == event.depoId);

    depoBazindaStoklar.forEach((depoBazindaStok) => {
      event.urunRecete.urunReceteHareketler.forEach((urunReceteHareket) => {
        if (depoBazindaStok.stokId == urunReceteHareket.stokId) {
           depoBazindaStok.miktar = depoBazindaStok.miktar - (urunReceteHareket.miktar*event.miktar);
         
          this.DepoBazindaStokService.update(depoBazindaStok, () => {});
        }
      });
    });

    const maps = new Map(depoBazindaStoklar.map((s) => [s.stokId, s]));
    const result = event.urunRecete.urunReceteHareketler.filter(
      (f) => !maps.get(f.stokId)
    );

    let index = 0;
    result.forEach((element) => {
      let createDepoBazindaStok = {
        depoId: event.depoId,
        stokId: element.stokId,
        miktar: 0, //depoda bu stok olmadığı için miktar olarak '0' verildi.
        hourId: String(new Date().valueOf()) + index,
      };
      ++index;

      this.DepoBazindaStokService.create(createDepoBazindaStok, () => {});
    });
  }
}
