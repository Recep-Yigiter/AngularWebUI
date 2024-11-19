import { Component } from '@angular/core';

@Component({
  selector: 'app-finans',
  templateUrl: './finans.component.html',
  styleUrls: ['./finans.component.scss'],
})
export class FinansComponent {
  menu = [
    {
      label: 'Finans-İzle',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Cari Hareketler',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/finans/banka/list', expanded: false,
        },
        {
          label: 'Banka Hareketler',
          icon: 'fa fa-inbox',
          submenu: [], expanded: false,
          href: '/finans/kasa/list',
        },
        {
          label: 'Kasa Hareketler',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '',
          expanded: false,
        },
      ],
    },
    {
      label: 'İşlemler',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Nakit',
          icon: 'fa fa-circle text-warning', expanded: false,
          submenu: [
            {
              label: 'Nakit Ödeme',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Nakit Tahsilat',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
          ],
          href: '',
      
        },

        {
          label: 'Çek İşlemleri',
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
              label: 'Alınan Çek',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Verilen Çek',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
          ],
          href: '',
          expanded: false,
        },
        {
          label: 'Senet İşlemleri',
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
              label: 'Alınan Senet',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Verilen Senet',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
          ],
          href: '',
          expanded: false,
        },
        {
          label: 'Teminat İşlemleri',
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
              label: 'Alınan Tem. Çeki',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Alınan Tem. Senedi',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Alınan Tem. Mektubu',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Verilen Tem. Çeki',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Verilen Tem. Senedi',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Verilen Tem. Mektubu',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
          ],
          href: '',
          expanded: false,
        },
        {
          label: 'Ödeme / Tahsilat',
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
              label: 'Havale Gönder',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Gelen Havale',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Para Yatır',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
            {
              label: 'Para Çekme',
              icon: 'fa fa-circle text-warning',
              submenu: [],
              href: '',
              expanded: false,
            },
          ],
          href: '',
          expanded: false,
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
          label: 'Cari',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '/finans/cari/list',
          expanded: false,
        },
        {
          label: 'Banka',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '/finans/banka/list',
          expanded: false,
        },
        {
          label: 'Kasa',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '/finans/kasa/list',
          expanded: false,
        },
        {
          label: 'Ç/S Kasa',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          href: '',
          expanded: false,
        },
        {
          label: 'Fatura',
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
            label: 'Alış Faturası',
            icon: 'fa fa-circle text-warning',
            submenu: [],
            href: '/finans/fatura/alis-fatura/list',
            expanded: false,
          },
            {
            label: 'Satış Faturası',
            icon: 'fa fa-circle text-warning',
            submenu: [],
            href: '/finans/fatura/satis-fatura/list',
            expanded: false,
          },

        ],
          href: '',
          expanded: false,
        },
        {
          label: 'İrsaliye',
          icon: 'fa fa-circle text-warning',
          submenu: [
            {
            label: 'Alış İrsaliyesi',
            icon: 'fa fa-circle text-warning',
            submenu: [],
            href: '/finans/irsaliye/alis-irsaliye/list',
            expanded: false,
          },
            {
            label: 'Satış İrsaliyesi',
            icon: 'fa fa-circle text-warning',
            submenu: [],
            href: '/finans/irsaliye/satis-irsaliye/list',
            expanded: false,
          },
        ],
          href: '',
          expanded: false,
        },
        
      ],
    },

  ];

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }

}
