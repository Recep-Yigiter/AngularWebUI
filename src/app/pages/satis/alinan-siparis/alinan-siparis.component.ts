import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';

@Component({
  selector: 'app-alinan-siparis',
  templateUrl: './alinan-siparis.component.html',
  styleUrls: ['./alinan-siparis.component.scss'],
  providers: [DatePipe],
})
export class AlinanSiparisComponent {
}

