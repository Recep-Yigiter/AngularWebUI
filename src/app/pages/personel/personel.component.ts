import { Component } from '@angular/core';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.scss']
})
export class PersonelComponent {
   menu = [
    {
      label: 'Personel',
      icon: '',
      href: '', expanded: false,
      submenu: [
        {
          label: 'Personel / Departman Girişi', icon: 'fa fa-inbox', href: '', expanded: false,
          submenu: [
            { label: 'Departman İşlemleri', icon: 'fa fa-inbox', submenu: [], href: '/personel/departman-islemleri', expanded: false, },
            { label: 'Personel İşlemleri', icon: 'fa fa-inbox', submenu: [], href: '/personel/personel-islemleri', expanded: false, },

          ]
        },
        { label: 'İzin Ve Rapor Girişi', icon: 'fa fa-inbox', submenu: [], href: '' , expanded: false,},
        { label: 'Aylık Puantaj Tablosu', icon: 'fa fa-inbox', submenu: [], href: '' , expanded: false,},
        { label: 'Çalışma Saatleri', icon: 'fa fa-inbox', submenu: [], href: '' , expanded: false,},
        { label: 'Tatil Girişleri', icon: 'fa fa-inbox', submenu: [], href: '', expanded: false, },
        { label: 'Yıllık İzinler', icon: 'fa fa-inbox', submenu: [], href: '', expanded: false, },
        { label: 'Giriş Onay / Kart Tanımları', icon: 'fa fa-inbox', submenu: [], href: '' , expanded: false,},
        { label: 'Kart Hareketleri Ve Raporlar', icon: 'fa fa-inbox', submenu: [], href: '' , expanded: false,},
        { label: 'Bordro Bilgileri', icon: 'fa fa-inbox', submenu: [], href: '', expanded: false, },
        { label: 'Olay Görüntüleyici ', icon: 'fa fa-inbox', submenu: [], href: '', expanded: false, },
        { label: 'Uygulama Kılavuzu ', icon: 'fa fa-inbox', submenu: [], href: '' , expanded: false,},
        { label: 'Ayarlar ', icon: 'fa fa-inbox', submenu: [], href: '', expanded: false, },
      ],
    },

  ];

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
