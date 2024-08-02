import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankaService } from 'src/app/core/services/repository/banka.service';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { CariService } from 'src/app/core/services/repository/cari.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-detail-banka',
  templateUrl: './detail-banka.component.html',
  styleUrls: ['./detail-banka.component.scss']
})
export class DetailBankaComponent implements OnInit {

  stateData: any;
  constructor(private router: Router, private BankaService: BankaService) {
    this.stateData = history.state
  }
  ngOnInit(): void {
this.rowData=this.stateData.bankaHesaplar
  }

  Cari: any;
  async duzenle() {
    if (this.stateData?.id) {

      this.router.navigate(['/menu/finans/banka/update'], { state: history.state })

    }
    else {
      this.Cari = (await this.BankaService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/menu/finans/banka/update'], { state: this.Cari })
    }
  }

  sil() {
    this.BankaService.delete(this.stateData.id)
  }


  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any;
  rowData: any=[];

  colDefs: ColDef[] = [
    { field: "hesapNo", headerName: "Hesap No", width: 100, },
    { field: "hesapAdi", headerName: "Hesap Adı", width: 150 },
    { field: "hesapTuruAdi", headerName: "Hesap Türü", width: 350, },
    //{ field: "ibanNo", headerName: "Iban No", width: 350, },
    // { field: "mutabakatTarihi", headerName: "Stok Adı", width: 350, },
    // { field: "emkbBankaKodu", headerName: "Stok Adı", width: 350, },
    // { field: "emkbSubeKodu", headerName: "Stok Adı", width: 350, },
    // { field: "musteriNo", headerName: "Stok Adı", width: 350, },
    // { field: "faiz", headerName: "Stok Adı", width: 350, },
    // { field: "komisyon", headerName: "Stok Adı", width: 350, },
    // { field: "paraBirimi", headerName: "Stok Adı", width: 350, },
    // { field: "dovizCinsi", headerName: "Stok Adı", width: 350, },




  ];



}
