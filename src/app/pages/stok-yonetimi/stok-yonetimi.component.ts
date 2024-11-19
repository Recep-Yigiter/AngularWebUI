import { Component } from '@angular/core';
import { CreateStokComponent } from './stok/create-stok/create-stok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stok-yonetimi',
  templateUrl: './stok-yonetimi.component.html',
  styleUrls: ['./stok-yonetimi.component.scss'],
})
export class StokYonetimiComponent {
  menu = [
    {
      label: 'Kartlar',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Stok',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/stok-yonetimi/stok/list',
          expanded: false,
        },
        {
          label: 'Depo',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/stok-yonetimi/depo/list',
          expanded: false,
        },
        {
          label: 'Hizmet',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/stok-yonetimi/hizmet/list',
          expanded: false,
        },
        {
          label: 'Masraf',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/stok-yonetimi/masraf/list',
          expanded: false,
        },
      ],
    },
    {
      label: 'Hareketler',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Giriş',
          icon: 'fa fa-circle text-warning',
          expanded: false,
          submenu: [
            {
              label: 'Satınalma Mal Girişi',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Konsiye Girişi',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Konsiye Çıkıştan İade Alımı',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Teşvikli İthalat',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Teşviksiz İthalat',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Fason Giriş',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
          ],
          href: '',
        },
        {
          label: 'Çıkış',
          expanded: false,
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
              label: 'Parakende Satış',
              expanded: false,
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
            },
            {
              label: 'Toptan Satış',
              expanded: false,
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
            },
          ],
          href: '',
        },
        {
          label: 'Depo Transferi',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Stok Devir',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Barkod Oluştur',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Maliyet Düzenle',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
      ],
    },
    {
      label: 'Listeler',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Stok Listesi',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '/stok-yonetimi/stok/list',
          expanded: false,
        },
        {
          label: 'Stok Hareket Listesi',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Stok Bazında Hareketler',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Stok Toplam',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Depo Hareket Listesi',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Depo Transfer Hareketleri',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Hizmet Listesi',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
      ],
    },
    {
      label: 'Tanımlar',
      icon: '',
      href: '', expanded: false,
      submenu: [
        {
          label: 'Stok Sınıfları',
          icon: 'fa fa-circle text-warning',
          submenu: [], expanded: false,
          href: '',
        },
        {
          label: 'Hizmet Sınıfları',
          icon: 'fa fa-circle text-warning',
          submenu: [], expanded: false,
          href: '',
        },
        {
          label: 'Depo Sınıfları',
          icon: 'fa fa-circle text-warning',
          submenu: [], expanded: false,
          href: '',
        },
        {
          label: 'Birim Tanımları',
          icon: 'fa fa-circle text-warning',
          submenu: [], expanded: false,
          href: '',
        },
      ],
    },
  ];

  /**
   *
   */
  constructor() {}

  show: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  showSubMenu(index: number) {
    this.show[index] = !this.show[index];
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
