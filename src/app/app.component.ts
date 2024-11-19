import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';
import { RbacService } from './Auth/rbac.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularWebERP';
  user: any;
  display: any = 'none';
  opacity: any = 1;
  isLoginPage = false;
  constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private RbacService: RbacService
  ) {}
  componentLoading: boolean;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.spinnerService.show();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoginPage = event.url === '/login'; // Eğer login sayfasına gidiliyorsa layout'ı gizle
      }
    });

    let result = this.RbacService.isGranted('Admin');
    if (result) {
      this.moduls.push(
        {
        modul: 'Yönetim',
        icon: 'fa-solid fa-shield-halved',
        class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
        href: 'yonetim',
        disabled: false,
      },);
    }
  }

  currentPath: string;
  pathList: string[];
  getCurrentPath(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;

        this.pathList = this.currentPath.slice(1).split('/');
        if (!this.pathList.includes('')) {
          this.pathList.unshift('');
        }
      });
  }

  moduls = [
    {
      modul: 'Muhasebe',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'muhasebe',
      disabled: false,
    },
    {
      modul: 'Stok',
      icon: 'fa-solid fa-cubes',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'stok-yonetimi',
      disabled: false,
    },
    {
      modul: 'Finans',
      icon: 'fa-solid fa-coins',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'finans',
      disabled: false,
    },
    {
      modul: 'Satış',
      icon: 'fa-solid fa-share-from-square',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'satis',
      disabled: false,
    },
    {
      modul: 'Satınalma',
      icon: 'fa-solid fa-shop',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'satinalma',
      disabled: false,
    },
    {
      modul: 'Üretim',
      icon: 'fa-solid fa-industry',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'uretim',
      disabled: false,
    },
    {
      modul: 'Personel',
      icon: 'fa-solid fa-users',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'personel',
      disabled: false,
    },

  ];

  cikis() {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  show() {
this.isDropdownOpen=!this.isDropdownOpen
  }











  isDropdownOpen = false;


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Eğer tıklama dropdown dışında bir yerde olduysa menüyü kapat
    const clickedInside = event.target instanceof HTMLElement && event.target.closest('.portHeadLightMenu');
   
    if (!clickedInside) {

      this.isDropdownOpen=false;
    }
  }


}
