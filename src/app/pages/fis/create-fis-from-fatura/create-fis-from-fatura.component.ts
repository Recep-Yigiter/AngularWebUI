import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FaturaHareketService } from 'src/app/core/services/repository/fatura-hareket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FisService } from 'src/app/core/services/repository/fis.service';
import { FaturaService } from 'src/app/core/services/repository/fatura.service';

@Component({
  selector: 'app-create-fis-from-fatura',
  templateUrl: './create-fis-from-fatura.component.html',
  styleUrls: ['./create-fis-from-fatura.component.scss'],
  providers: [DatePipe],
})
export class CreateFisFromFaturaComponent implements AfterViewChecked,OnInit {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;
  @Input() data;

  constructor(
    public activeModal: NgbActiveModal,
    private FaturaHareketService: FaturaHareketService,
    private FaturaService: FaturaService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private DatePipe: DatePipe,
    private FisService: FisService
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }
  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    { field: 'hesapKodu', width: 100 },
    { field: 'hesapAdi' },
    { field: 'aciklama' },
    { field: 'borcTutari' },
    { field: 'alacakTutari' },
    { field: 'belgeTuru' },
    { field: 'belgeSerino' },
    { field: 'belgeTuru' },
  ];
  public frm: FormGroup = this.fb.group({
    fisTarihi: [null, [Validators.required, Validators.maxLength(16)]],
    fisNo: [null, [Validators.required, Validators.maxLength(16)]],
    yevmiyeNo: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],
    fisTipi: [null, [Validators.required, Validators.maxLength(16)]],
  });
  get fisTarihi() {
    return this.frm.get('fisTarihi');
  }
  get fisNo() {
    return this.frm.get('fisNo');
  }
  get yevmiyeNo() {
    return this.frm.get('yevmiyeNo');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }
  get fisTipi() {
    return this.frm.get('fisTipi');
  }
  createdDate: any = new Date();
  // fisTarihi
  // fisNo
  // yevmiyeNo
  // aciklama
  // fisTipi
  fisNumarasi: any;

  async submit() {

    
    let fis = {
      fisTarihi: this.data.createdDate,
      fisNo: this.frm.value.fisNo ? this.frm.value.fisNo : this.fisNumarasi,
      yevmiyeNo: this.frm.value.yevmiyeNo,
      aciklama: this.frm.value.aciklama,
      fisTipi: this.selectedFisTipi?.fisTipi
        ? this.selectedFisTipi?.fisTipi
        : 1,
      fisSatirlar: this.rowData,
    };
    this.data.FaturaDurumu = false;
    await this.FisService.create(fis, () => {
      this.FaturaService.update(this.data, () => {
        this.activeModal.close();
      });
    
    });
  }

  async getList(params: GridReadyEvent<any>) {
    this.createdDate = this.DatePipe.transform(
      this.data.createdDate,
      'yyyy-MM-dd'
    );
    this.fisNumarasi = await this.FisService.getCode(true);
    var muhasebe = await this.FaturaHareketService.getByFaturaIdFaturaHareket(
      this.data.id
    );
    this.gridApi = params.api;
    this.rowData = muhasebe;
  }
  selectedRow: any;

  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
  }

  Kasas: any[] = [];
  close() {
    this.activeModal.close(this.selectedRow);
  }
  fisTipleri: any[] = [{ fisTipi: 1, ad: 'Mahsup' }];
  selectedFisTipi: any;
  valueChangeFunc(item) {
    this.selectedFisTipi = item;
  }
}
