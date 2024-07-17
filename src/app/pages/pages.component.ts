import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RbacService } from '../Auth/rbac.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
 
  constructor(private Router: Router) {}

  ngOnInit(): void { }


  stokRouter() {
    this.Router.navigate(['/menu/malzeme-yonetimi'])
  }
  satinalmaRouter() {
    this.Router.navigate(['/menu/satinalma'])
  }
  satisRouter() {
    this.Router.navigate(['/menu/satis'])
  }
  uretimRouter() {

  }
  finansRouter() {

  }
  faturaRouter() {
    this.Router.navigate(['/menu/fatura'])
  }
  irsaliyeRouter() {
    this.Router.navigate(['/menu/irsaliye'])
  }




  cikis() {
    localStorage.removeItem("tokenData");
    this.Router.navigate(['/login'])
  }

}
