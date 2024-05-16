import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

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
        icon: '../../../assets/in-stock (1).png',
        router: ()=>{this.router.navigate(['/pages/router-test',],{ state: this.denemeListe })}
      },
      {
        label: 'Satın Alma',
        icon: '../../../assets/order-fulfillment.png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Satış',
        icon: '../../../assets/in-stock (1).png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Üretim',
        icon: '../../../assets/in-stock (1).png',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Finans',
        icon: '../../../assets/in-stock (1).png',
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
