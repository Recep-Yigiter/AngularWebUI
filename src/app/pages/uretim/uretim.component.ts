import { Component } from '@angular/core';

@Component({
  selector: 'app-uretim',
  templateUrl: './uretim.component.html',
  styleUrls: ['./uretim.component.scss']
})
export class UretimComponent {
  menu = [
    {
      label: 'Kartlar',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'İş Merkezi ',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Üretim Emri',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/uretim/uretim-emri/list',
        },
        {
          label: 'Ürün Ağacı',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Ürün Reçetesi',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/uretim/urun-recete/list',
        },
      ],
    },

  ];
  /**
   *
   */
  constructor() {}
  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
