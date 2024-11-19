import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
@Component({
  selector: 'app-hizmet',
  templateUrl: './hizmet.component.html',
  styleUrls: ['./hizmet.component.scss']
})
export class HizmetComponent {


}
