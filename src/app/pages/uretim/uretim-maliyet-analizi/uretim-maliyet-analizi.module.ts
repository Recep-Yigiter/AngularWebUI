import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UretimMaliyetAnaliziComponent } from './uretim-maliyet-analizi.component';
import { DetailUretimMaliyetAnaliziComponent } from './detail-uretim-maliyet-analizi/detail-uretim-maliyet-analizi.component';
import { GenelBakisUretimMaliyetAnaliziComponent } from './genel-bakis-uretim-maliyet-analizi/genel-bakis-uretim-maliyet-analizi.component';


import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';

@NgModule({
  declarations: [
    UretimMaliyetAnaliziComponent,

    DetailUretimMaliyetAnaliziComponent,
    GenelBakisUretimMaliyetAnaliziComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'uretim-maliyet-analizi', component: UretimMaliyetAnaliziComponent
      },   
      {
        path: 'detail-uretim-maliyet-analizi', component: DetailUretimMaliyetAnaliziComponent
      },    
      {
        path: 'genel-bakis-uretim-maliyet-analizi', component: GenelBakisUretimMaliyetAnaliziComponent
      },    
       
     
    ])
  ]
})
export class UretimMaliyetAnaliziModule { }
