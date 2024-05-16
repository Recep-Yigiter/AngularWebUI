import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  denemeListe: any[] = [];
  constructor(private router: Router,) {

    
  }
  stateData:any=0;
  ngOnInit(): void {
    // this.router.navigate(['/pages/stok/update-stok'], { state: this.stateData })
    this.denemeListe = [
      {
        label: 'Stok',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ],
        icon: '../../assets/icons/in-stock (1).png',
        router: ()=>{this.router.navigate(['/pages/stok/stok'], { state: this.stateData })}
      },
      {
        label: 'Satın Alma',
        icon: '../../assets/icons/order-fulfillment.png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Satış',
        icon: '../../assets/icons/sales.png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Üretim',
        icon: '../../assets/icons/procurement.png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Finans',
        icon: '../../assets/icons/budget.png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: '',
        icon: '',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

  deneme(){
    this.router.navigate(['/pages/router-test'], { state: this.stateData })
  }


}
