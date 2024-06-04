import { Component, OnInit } from '@angular/core';
import { UrunAgaciService } from './core/services/urun-agaci.service';
import { UrunAgaciTreeViewService } from './core/services/urun-agaci-treeview.service';

@Component({
  selector: 'app-urun-agaci',
  templateUrl: './urun-agaci.component.html',
  styleUrls: ['./urun-agaci.component.scss']
})
export class UrunAgaciComponent implements OnInit {

  stateData: any
  treeViewDataSource: any;
  selectedUrunGrubu: any;
  menu: any;
  selectedNode: any;
  UrunAgaciDetayList: any;
  toggleVisible: any;
  expand = {};
  constructor(
    private UrunAgaciService: UrunAgaciService,
    private UrunAgaciTreeViewService: UrunAgaciTreeViewService
  ) {
    this.toggleVisible = this.UrunAgaciTreeViewService.toggleVisible

  }


  
  ngOnInit(): void {
    this.TreeViewList();
  }



  tabs: any[] = ["Kabin", "Kapı", "Buton", "Ağırlık Şasesi", "Makine Şasesi", "Pano"]

  detay(){
  
  }



  async TreeViewList() {
    const getList = await this.UrunAgaciService.GetList();
    this.treeViewDataSource = getList;

    const deneme = this.treeViewDataSource.data

    deneme.forEach(element => {

      if (element.parentId == "00000000-0000-0000-0000-000000000000" || element.parentId == null) {
        element.parentId = null
      } else {
        element.parentId = element.parentId
      }
    });

    var tree = this.UrunAgaciTreeViewService.CreateTreeView(deneme);


    this.menu = tree.map(x => this.UrunAgaciTreeViewService.toNode(x));

    this.selectedNode = null;

    // this.UrunAgaciDetayList = [
    //   { label: "Adı", value: null },
    //   { label: "ağaç Adı ", value: null },
    //   { label: "Tipi", value: null },
    //   { label: "Durum", value: null },
    //   { label: "Fason", value: null },
    //   { label: "Notlar", value: null },
    //   { label: "Oluşturan", value: null },
    //   { label: "Oluşturma Tarihi", value: null },
    //   { label: "Değiştiren", value: null },
    //   { label: "Değiştirme Tarihi", value: null },

    // ]

  }

  selectNode(node: any) {


    this.UrunAgaciDetayList = []
    this.selectedNode = node;
    this.UrunAgaciDetayList = [
      { label: "Kodu", value: this.selectedNode?.kod },
      { label: "Adı", value: this.selectedNode?.ad },
      { label: "Ölçü Birimi", value: this.selectedNode?.birimAdi },
      { label: "Birim Fiyatı", value: String(this.selectedNode?.birimFiyat ) + ' ₺' },
      { label: "Alış KDV Oranı", value: '20 %' },
      { label: "Satış KDV Oranı", value: '20 %' },
      { label: "Alış Vade Süresi", value:'0' },
      { label: "Satış Vade Süresi", value:'0' },
      { label: "Satır İskonto", value:'Uygulanır' },
      { label: "İskonto", value:'0 %' },
      { label: "Ürün Grubu", value:'Kabin' },
      { label: "Açıklama", value:'NULL' },
      { label: "Oluşturan", value: 'Recep YİĞİTER' },
      { label: "Oluşturma Tarihi", value: null },
      { label: "Değiştiren", value: 'Recep YİĞİTER' },
      { label: "Değiştirme Tarihi", value: null },
    ]

  }
  async selectedTabChange(event) {
    this.treeViewDataSource = [];
    const getList = await this.UrunAgaciService.GetList();
    this.treeViewDataSource = getList;
    const deneme = this.treeViewDataSource.data.filter(d => d.urunGrubu == event.tab.textLabel);
    this.selectedUrunGrubu = event.tab.textLabel;
    deneme.forEach(element => {
      if (element.parentId == "00000000-0000-0000-0000-000000000000" || element.parentId == null) {
        element.parentId = null
      } else {
        element.parentId = element.parentId
      }
    });

    var tree = this.UrunAgaciTreeViewService.CreateTreeView(deneme);
    this.menu = tree.map(x => this.UrunAgaciTreeViewService.toNode(x));
    this.selectedNode = null;
    this.UrunAgaciDetayList = [
      { label: "UrunAgaci Kodu", value: null },
      { label: "UrunAgaci Kısa Adı ", value: null },
      { label: "UrunAgaci Adı", value: null },
      { label: "UrunAgaci Türü", value: null },
      { label: "Sipariş İhtiyaç Seviyesi", value: null },
      { label: "Birim1 Adı ", value: null },
      { label: "Birim2 Adı ", value: null },
      { label: "Birim3 Adı ", value: null },
      { label: "Katsayı ", value: null },
      { label: "Alış KDV Oranı ", value: null },
      { label: "Satış KDV Oranı ", value: null },
      { label: "Alış Vade Süresi", value: null },
      { label: "Satış Vade Süresi", value: null },
      { label: "Satır İskonto", value: null },
    ]

  }

  Visible(node: any) {

    if (node.submenu && node.submenu?.length) {
      if (this.expand[node.index]) {
        this.expand[node.index] = false;
      } else {
        this.expand[node.index] = true;
      }
    }
  }
  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }
}
