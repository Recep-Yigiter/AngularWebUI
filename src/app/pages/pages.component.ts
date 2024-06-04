import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  /**
   *
   */
  constructor(private Router:Router) {
    
  }


  stokRouter(){
    this.Router.navigate(['/stok/list'])
  }
  satinalmaRouter(){
    this.Router.navigate(['/satinalma'])
  }
  satisRouter(){
    this.Router.navigate(['/satis'])
  }
  uretimRouter(){
   
  }
  finansRouter(){
    
  }
  faturaRouter(){
    this.Router.navigate(['/fatura'])
  }
  irsaliyeRouter(){
    this.Router.navigate(['/irsaliye'])
  }




  cikis(){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.Router.navigate(['/login'])
  }

}
