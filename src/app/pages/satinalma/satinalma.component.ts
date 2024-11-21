import { Component } from '@angular/core';

@Component({
  selector: 'app-satinalma',
  templateUrl: './satinalma.component.html',
  styleUrls: ['./satinalma.component.scss']
})
export class SatinalmaComponent {
  menu = [
    {
      label: 'Kartlar',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Verilen Sipariş ',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/satinalma/verilen-siparis/list',
        },
        {
          label: 'Alınan Teklif',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/satinalma/alinan-teklif/list',
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
          label: 'Verilen Siparişler',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '/satinalma/verilen-siparis/list',
        },
        {
          label: 'Alınan Teklifler',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '/satinalma/alinan-teklif/list',
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
