import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { CreateStokModel } from 'src/app/core/models/stok/create-stok-model';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BirimSelectModalComponents } from 'src/app/shared/utilities/modals/birim-selected-modal';
import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';

@Component({
  selector: 'app-create-stok',
  templateUrl: './create-stok.component.html',
  styleUrls: ['./create-stok.component.scss'],
  providers: [CurrencyPipe],
})
export class CreateStokComponent implements OnInit {
  // BirimDataSource: any;
  // selectedBirim: any
  // async ngOnInit() {
  //   this.BirimDataSource = (await this.BirimService.list(() => { })).items;
  //   this.selectedBirim = this.BirimDataSource[0];

  // }

  // createStok() {

  //   const createModel = new CreateStokModel();
  //   createModel.ad = this.frm.value.ad;
  //   createModel.kod = this.frm.value.kod;
  //   createModel.birimId = this.frm.value.birimId?.id;
  //   createModel.birimAdi = this.frm.value.birimId?.ad;
  //   createModel.birimFiyat = this.frm.value.birimFiyat;
  //   createModel.stokGrup = "Stok";
  //   createModel.durum = true;
  //   createModel.aciklama = this.frm.value.aciklama;
  //   createModel.hourId = String(new Date().valueOf());

  //   this.StokService.create(createModel, () => {
  //     this.router.navigate(['/menu/malzeme-yonetimi/stok/detail'], { state: createModel })
  //   }, errorMessage => { })

  // }

  // changed(event) { }

  // geri() {
  //   this.router.navigate([ROUTER_NAVIGATE.stok_list])
  // }

  // vazgec() {
  //   this.router.navigate([ROUTER_NAVIGATE.stok_list])
  // }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private StokService: StokService,
    private BirimService: BirimService,
    public activeModal: NgbActiveModal,
    private muhasebeKodService: MuhasebeKodService
  ) {}

  ngOnInit(): void {}

  public frm: FormGroup = this.fb.group({
    kod: [null],
    ad: [null],
    birimFiyat: [null],
    aciklama: [null],
    stokGrup: [null],
    durum: [null],
    birimId: [null],
    birimAdi: [null],
  });
  get kod() {
    return this.frm.get('kod');
  }
  get ad() {
    return this.frm.get('ad');
  }
  get birimFiyat() {
    return this.frm.get('birimFiyat');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }
  get stokGrup() {
    return this.frm.get('stokGrup');
  }
  get durum() {
    return this.frm.get('durum');
  }
  get birimId() {
    return this.frm.get('birimId');
  }

  Kaydet() {
    const createModel = new CreateStokModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.birimId = this.selectedBirim?.id;
    createModel.birimAdi = this.selectedBirim?.ad;
    createModel.birimFiyat = Number(this.frm.value.birimFiyat);
    createModel.stokGrup = 'Stok';
    createModel.durum = true;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = String(new Date().valueOf());
    createModel.muhasebeKodlari = [
      {
        hareketTipi: 1,
        hesapId: 'b85b0fec-f77c-465d-5e52-08dc83bd2645',
        stokId: 'edbf521f-0033-481f-667b-08dccb0b88b7',
      },
    ];
    this.StokService.create(
      createModel,
      () => {
        this.activeModal.close(true);
      },
      (errorMessage) => {}
    );
  }



  cikis() {
    this.activeModal.close(false);
  }

  BirimSelectModalComponent: any = BirimSelectModalComponents;
  selectedBirim: any;
  BirimChildFunc(event) {
    this.selectedBirim = event;
  }

  file: any;
  arrayBuffer: any;
  exceljsondata: any;
  Upload() {
    //onFileChange() methodu dosyayı almak içindir
    //Upload() Methodu alınan dosyanın işlenmesi içindir
    //Dosyayı almak için aşağıdaki input kullanılacak
    // <input type="file" class="custom-file-input" id="customFile" name="myfile"(change)="onFileChange($event)" #UploadFileInput>

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        defval: '',
      });
      const createModel = new CreateStokModel();

      let index = 0;
      setInterval(() => {
        createModel.ad = this.exceljsondata[index].ad;
        createModel.kod = this.exceljsondata[index].kod;
        createModel.birimId = this.exceljsondata[index].birimId;
        createModel.birimAdi = this.exceljsondata[index].birimAdi;
        createModel.birimFiyat = 0;
        createModel.stokGrup = this.exceljsondata[index].stokGrup;
        createModel.durum = true;
        createModel.aciklama = null;
        createModel.hourId = String(new Date().valueOf());

        this.StokService.create(
          createModel,
          () => {},
          (errorMessage) => {}
        );
        index++;
      }, 100);

      this.exceljsondata.forEach((item) => {});
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}
