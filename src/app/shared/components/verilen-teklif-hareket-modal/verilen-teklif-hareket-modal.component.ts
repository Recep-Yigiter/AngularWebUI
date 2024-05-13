import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TeklifService } from 'src/app/core/services/repository/teklif.service';

@Component({
  selector: 'app-verilen-teklif-hareket-modal',
  templateUrl: './verilen-teklif-hareket-modal.component.html',
  styleUrls: ['./verilen-teklif-hareket-modal.component.scss'],
  providers: [DatePipe],
})
export class VerilenTeklifHareketModalComponent implements OnInit {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;
  @Input() selectedTeklifs: any;


  constructor(
    public activeModal: NgbActiveModal,
    private TeklifService: TeklifService,
    private DatePipe: DatePipe,
    private modalService: NgbModal,) {

  }
  ngOnInit(): void {

  }

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    {
      field: "createdDate",
      headerName: "Hareket Tarihi",
      width: 140,
      valueFormatter: params => this.DatePipe.transform(params.value, ' dd.MM.yyyy'),
      pinned: "left",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "stokAdi", width: 600, minWidth: 250 },
    { field: "miktar", editable: true, valueFormatter: params => params.data.miktar.toFixed(2) },
    { field: "birimAdi", },
    { field: "birimFiyat", editable: true, cellRenderer: this.CurrencyCellRendererTR, },
    { field: "iskonto", headerName: "isk.(%)", width: 80, editable: true, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
    { field: "iskontoTutar", headerName: "isk. Tutarı", width: 120, cellRenderer: this.CurrencyCellRendererTR, },
    { field: "satirTutar", width: 100, cellRenderer: this.CurrencyCellRendererTR, pinned: "right" },

  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.selectedTeklifs.forEach(teklif => {
      teklif.teklifHareketler.forEach(teklifHareket => {
        teklifHareket.siparisHareketTuru=1;
        teklifHareket.siparisHareketTuruAdi="Stok";
        teklifHareket.satirTutar = (teklifHareket.miktar * teklifHareket.birimFiyat);
        teklifHareket.iskontoTutar = (teklifHareket.satirTutar * teklifHareket.iskonto) / 100;
        teklifHareket.iskontoSonrasiTutar = (teklifHareket.satirTutar) - teklifHareket.iskontoTutar;
        teklifHareket.kdvTutar = (teklifHareket.iskontoSonrasiTutar) * Number(teklif.kdv) / 100;
        teklifHareket.genelToplam = teklifHareket.iskontoSonrasiTutar + teklifHareket.kdvTutar
        this.gridApi.applyTransaction({ add: [teklifHareket], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
      });


    });

  }
  selectedRows: any;


  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();


  }

  Teklifs: any[] = [];
  close() {


    // this.activeModal.close(this.selectedRow)

  }

  aktar() {
    this.activeModal.close(this.selectedRows)
  }


}

