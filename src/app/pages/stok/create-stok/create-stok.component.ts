import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StokService } from '../../../core/services/repository/stok.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CreateStokModel } from '../../../core/models/stok/create-stok-model';
import * as XLSX from 'xlsx';


type AOA = any[][];
@Component({
  selector: 'app-create-stok',
  templateUrl: './create-stok.component.html',
  styleUrls: ['./create-stok.component.scss'],
  providers: [CurrencyPipe,]
})
export class CreateStokComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private StokService: StokService
  ) {


  }
  async ngOnInit() {


  }
  public frm: FormGroup = this.fb.group({

    kod: [null,],
    ad: [null,],
    birimFiyat: [null,],
    aciklama: [null,],
    stokGrup: [null,],
    durum: [null,],
    parentId: [null,],
    birimId: [null,],
    birimAdi: [null,],
  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get birimFiyat() { return this.frm.get('birimFiyat') }
  get aciklama() { return this.frm.get('aciklama') }
  get stokGrup() { return this.frm.get('stokGrup') }
  get durum() { return this.frm.get('durum') }
  get parentId() { return this.frm.get('parentId') }
  get birimId() { return this.frm.get('birimId') }






  file: any;
  arrayBuffer: any;
  exceljsondata: any;


  createStok() {

    const createModel = new CreateStokModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.birimId = this.frm.value.birimId?.id;
    createModel.birimAdi = this.frm.value.birimId?.ad;
    createModel.birimFiyat = this.frm.value.birimFiyat;
    createModel.stokGrup = this.frm.value.stokGrup;
    createModel.durum = true;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = String(new Date().valueOf());

    this.StokService.create(createModel, () => {
      this.router.navigate(['/stok/detail'], { state: createModel })
    }, errorMessage => { })


























  }

  changed(event) {


  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];

    }
  }
  Upload() {

//onFileChange() methodu dosyayı almak içindir
//Upload() Methodu alınan dosyanın işlenmesi içindir


    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: "" });
      const createModel = new CreateStokModel();

      let index=0;
      setInterval(() => {
        createModel.ad = this.exceljsondata[index].ad;
        createModel.kod = this.exceljsondata[index].kod;
        createModel.birimId = this.exceljsondata[index].birimId;
        createModel.birimAdi = this.exceljsondata[index].birimAdi;
        createModel.birimFiyat = 0;
        createModel.stokGrup = null;
        createModel.durum = true;
        createModel.aciklama = null;
        createModel.hourId = String(new Date().valueOf());
        this.StokService.create(createModel, () => {
          
         }, errorMessage => { })
        index++;
       
       },100);

      this.exceljsondata.forEach(item => {
      });


    }
    fileReader.readAsArrayBuffer(this.file);


  }






}


