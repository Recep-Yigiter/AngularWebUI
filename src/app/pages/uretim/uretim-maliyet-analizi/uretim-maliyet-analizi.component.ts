import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UrunReceteService } from '../urun-recete/core/services/urun-recete.service';
import { UretimEmriService } from '../uretim-emri/core/services/uretim-emri.service';

@Component({
  selector: 'app-uretim-maliyet-analizi',
  templateUrl: './uretim-maliyet-analizi.component.html',
  styleUrls: ['./uretim-maliyet-analizi.component.scss']
})
export class UretimMaliyetAnaliziComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
    private UretimEmriService: UretimEmriService,
    private router: Router,
  ) { }

  ngOnInit(): void {
   
  }


  colDefs: ColDef[] = [
    { field: "stokAdi", headerName: 'Stok', width: 300 },
    { field: "ortalamaToplamMaliyeti", headerName: 'Ort. Toplam Maliyet (Birim Bazında)', width: 250, type: 'rightAligned' },
    { field: "ortalamaBilesenMaliyeti", headerName: 'Ort. Bileşen Maliyeti (Birim Bazında)', width: 250, type: 'rightAligned' },
    { field: "ortalamaOperasyonMaliyeti", headerName: 'Ort. Operasyon Maliyeti (Birim Bazında)', width: 250, type: 'rightAligned' },
    { field: "uretilenMiktar", headerName: 'Üretilen Miktar', width: 150, type: 'rightAligned' },


  ];





  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.UretimEmriService.GetList(() => { })).data.items;
    this.bilesenToplamBirimFiyatHesapla();
  }
  onSelectionChanged() {

    const selectedRows = this.gridApi.getSelectedRows()[0];


    this.router.navigate(['/pages/uretim-maliyet-analizi/genel-bakis-uretim-maliyet-analizi'], { state: selectedRows })
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }



  groupByRowData: any[];

  deneme: any[] = [];
  bilesenToplamBirimFiyatHesapla() {

    this.rowData.forEach(uretimEmri => {
      for (let bilesen of uretimEmri.uretimEmriBilesenler) {
        bilesen.bilesenMaliyeti = bilesen.birimFiyat * (bilesen.miktar);
      }

      uretimEmri.toplamBilesenMaliyeti = uretimEmri.uretimEmriBilesenler.map(p => p.bilesenMaliyeti).reduce(myFunc);
      function myFunc(total, num) {
        return total + num;
      }
    });

    function groupBy(array, key) {
      return Array.from(array
        .reduce((m, o) => m.set(o[key], [...(m.get(o[key]) || []), o]), new Map)
        .values()
      );
    }
    var data = this.rowData, grouped = groupBy(data, 'stokAdi');
    this.groupByRowData = grouped;

    let rowMaliyet: any;
    this.groupByRowData.forEach(groupByRowDataItem => {
      groupByRowDataItem.forEach(uretimEmri => {
        rowMaliyet = {
          stokAdi: uretimEmri.stokAdi,
          ortalamaToplamMaliyeti: groupByRowDataItem.map(p => p.toplamBilesenMaliyeti).reduce((total, num) => { return total + num; }) / groupByRowDataItem.length + 0 / groupByRowDataItem.length,
          groupByUretimEmri: groupByRowDataItem,
          ortalamaBilesenMaliyeti: groupByRowDataItem.map(p => p.toplamBilesenMaliyeti).reduce((total, num) => { return total + num; }) / groupByRowDataItem.length,
          uretilenMiktar: groupByRowDataItem.map(p => p.miktar).reduce((total, num) => { return total + num; }) / groupByRowDataItem.length,
          ortalamaOperasyonMaliyeti: 0 / groupByRowDataItem.length,
        }
      });


       this.gridApi.applyTransaction({ add: [rowMaliyet], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

    });













  }


}
