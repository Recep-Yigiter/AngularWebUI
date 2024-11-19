import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateMahsupComponent } from './mahsup/create-mahsup/create-mahsup.component';
import { CreateTediyeComponent } from './tediye/create-tediye/create-tediye.component';
import { CreateTahsilComponent } from './tahsil/create-tahsil/create-tahsil.component';

@Component({
  selector: 'app-muhasebe',
  templateUrl: './muhasebe.component.html',
  styleUrls: ['./muhasebe.component.scss'],
})
export class MuhasebeComponent {
  menu = [
    {
      label: 'Kartlar',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'Hesap Planı',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/muhasebe/hesap-plani/list',
        },
        {
          label: 'Hesap Çerçevesi',
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
          label: 'Mahsup',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Tahsil',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Tediye',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'T.Muh',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Açılış',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Kapanış',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Diğer',
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
          label: 'Yevmiye Fiş Listesi',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Yevmiye Fişi Satır İzleme',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Muavin Defteri',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Kar / Zarar Tablosu',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'İçeri Alınan Kayıtları İzle',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
        {
          label: 'Dışarı Çıkan Kayıtları İzle',
          icon: 'fa fa-circle text-warning',
          submenu: [],
          expanded: false,
          href: '',
        },
      ],
    },
  ];
  /**
   *
   */
  constructor(private NgbModal: NgbModal) {}
  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }

  fisModal(label: any) {
    if (label == 'Mahsup') {
      const modalRef = this.NgbModal.open(CreateMahsupComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Yevmiye Fişi';
    } else if (label == 'Tahsil') {
      const modalRef = this.NgbModal.open(CreateTahsilComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Yevmiye Fişi';
    } else if (label == 'Tediye') {
      const modalRef = this.NgbModal.open(CreateTediyeComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Yevmiye Fişi';
    }
  }
}
