import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent,  CellClassParams,  ICellRendererParams,
  CellClassRules, } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { TeklifService } from 'src/app/core/services/repository/teklif.service';

@Component({
  selector: 'app-verilen-teklif',
  templateUrl: './verilen-teklif.component.html',
  styleUrls: ['./verilen-teklif.component.scss'],
  providers: [DatePipe],
})
export class VerilenTeklifComponent {

  
}





