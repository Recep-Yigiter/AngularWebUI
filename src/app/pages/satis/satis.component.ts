import { Component } from '@angular/core';

@Component({
  selector: 'app-satis',
  templateUrl: './satis.component.html',
  styleUrls: ['./satis.component.scss']
})
export class SatisComponent {
  menu = [
    {
      label: 'Kartlar',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Alınan Sipariş ',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Verilen Teklif',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '',
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
          label: 'Sipariş Hareketleri',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Teklif Hareketleri',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },

      ],
    },
    {
      label: 'Listler',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Alınan Siparişler',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '/satis/alinan-siparis/list',
        },
        {
          label: 'Verilen Teklifler',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '/satis/verilen-teklif/list',
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
