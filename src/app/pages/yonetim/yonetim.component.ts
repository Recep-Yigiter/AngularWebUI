import { Component } from '@angular/core';

@Component({
  selector: 'app-yonetim',
  templateUrl: './yonetim.component.html',
  styleUrls: ['./yonetim.component.scss']
})
export class YonetimComponent {
  menu = [
    {
      label: 'İşlemler',
      icon: '',
      href: '',
      expanded: false,
      submenu: [
        {
          label: 'User',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/yonetim/user/user-roles',
        },
        {
          label: 'Roller',
          icon: 'fa fa-inbox',
          submenu: [],
          expanded: false,
          href: '/yonetim/role/list',
        },
      ],
    },


  ];

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
