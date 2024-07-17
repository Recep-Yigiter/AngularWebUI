import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit,OnInit{
  title = 'AngularWebERP';

  constructor(private spinnerService: NgxSpinnerService,
    private router: Router,private cd: ChangeDetectorRef) {
   
   }
   componentLoading:boolean;
  ngOnInit() {
   
     this.spinnerService.show()
   
  }
  ngAfterViewInit(){ 
    setTimeout(() => {
      this.cd.detectChanges();
      this.spinnerService.hide()
      setTimeout(() => {
        this.componentLoading = true;
      }, 1000);
      
     });
  }


}
