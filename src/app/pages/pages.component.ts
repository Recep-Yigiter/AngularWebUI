import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RbacService } from '../Auth/rbac.service';
import { UserService } from '../core/services/repository/user.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

  user:any;

  constructor(private Router: Router, private UserService: UserService) {}

  async ngOnInit() {
  this.user= JSON.parse(localStorage.getItem('user'));;

  }

  stokRouter() {
    this.Router.navigate(['/menu/malzeme-yonetimi']);
  }
  satinalmaRouter() {
    this.Router.navigate(['/menu/satinalma']);
  }
  satisRouter() {
    this.Router.navigate(['/menu/satis']);
  }

  finansRouter() {
    this.Router.navigate(['/menu/finans']);
  }

  faturaRouter() {
    this.Router.navigate(['/menu/fatura']);
  }

  irsaliyeRouter() {
    this.Router.navigate(['/menu/irsaliye']);
  }

  uretim() {
    this.Router.navigate(['/menu/uretim']);
  }

  cikis() {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('user');
    this.Router.navigate(['/login']);
  }
}
