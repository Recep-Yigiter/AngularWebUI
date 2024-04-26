import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../pages/page.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SatisTabComponent } from './components/satis-tab/satis-tab.component';

@NgModule({
  declarations: [


  

  ],
  imports: [
    CommonModule,
    PageModule,
    RouterModule,
    MatIconModule,
    MatMenuModule

  ],
  exports:[
    MatIconModule,
    MatMenuModule
  ]
})
export class LayoutModule { }
