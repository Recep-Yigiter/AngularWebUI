import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RbacService } from '../Auth/rbac.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
 
  constructor(private Router: Router) {}

  ngOnInit(): void { }


  stokRouter() {
    this.Router.navigate(['/stok/list'])
  }
  satinalmaRouter() {
    this.Router.navigate(['/satinalma'])
  }
  satisRouter() {
    this.Router.navigate(['/satis'])
  }
  uretimRouter() {

  }
  finansRouter() {

  }
  faturaRouter() {
    this.Router.navigate(['/fatura'])
  }
  irsaliyeRouter() {
    this.Router.navigate(['/irsaliye'])
  }




  cikis() {
    localStorage.removeItem("tokenData");
    this.Router.navigate(['/login'])
  }

}
