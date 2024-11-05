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

  deneme:boolean=false;
  display:any='none';
  opacity:any=1



  show(){
    this.deneme=!this.deneme
    this.display='block';
    this.opacity=1
  }




  user:any;

  constructor(private Router: Router, private UserService: UserService) {}

  async ngOnInit() {
  this.user= JSON.parse(localStorage.getItem('user'));;

  }

  stokRouter() {
    this.Router.navigate(['/menu/malzeme-yonetimi/stok/list']);
  }
  satinalmaRouter() {
    this.Router.navigate(['/menu/satinalma/alinan-teklif/list']);
  }
  satisRouter() {
    this.Router.navigate(['/menu/satis/verilen-teklif/list']);
  }

  finansRouter() {
    this.Router.navigate(['/menu/finans/cari/cari-hareketler']);
  }

  faturaRouter() {
    this.Router.navigate(['/menu/fatura/alis-fatura/list']);
  }

  irsaliyeRouter() {
    this.Router.navigate(['/menu/irsaliye/alis-irsaliye/list']);
  }

  uretimRouter() {
    this.Router.navigate(['/menu/uretim/uretim-emri/list']);
  }

  muhasebeRouter() {
    this.Router.navigate(['/menu/muhasebe/hesap-plani/list']);
  }

  cikis() {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('user');
    this.Router.navigate(['/login']);
  }
}
