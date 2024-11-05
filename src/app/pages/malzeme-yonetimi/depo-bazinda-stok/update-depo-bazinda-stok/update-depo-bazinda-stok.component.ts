import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepoBazindaStokService } from 'src/app/core/services/repository/depo-bazinda-stok.service';
import { DepoSelectModalComponents } from 'src/app/shared/utilities/modals/depo-selected-modal';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';

@Component({
  selector: 'app-update-depo-bazinda-stok',
  templateUrl: './update-depo-bazinda-stok.component.html',
  styleUrls: ['./update-depo-bazinda-stok.component.scss'],
})
export class UpdateDepoBazindaStokComponent implements OnInit {
  @Input() data;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private DepoBazindaStokService: DepoBazindaStokService
  ) {}
  ngOnInit(): void {
    
  }

  public frm: FormGroup = this.fb.group({
    depoId: [null],
    stokId: [null],
    miktar: [null],
  });

  get miktar() {
    return this.frm.get('miktar');
  }
  get depoId() {
    return this.frm.get('depoId');
  }
  get stokId() {
    return this.frm.get('stokId');
  }
  Kaydet() {
    this.data.depoId = this.selectedDepo?.id
      ? this.selectedDepo?.id
      : this.data.depoId;
    this.data.stokId = this.selectedStok?.id
      ? this.selectedStok?.id
      : this.data.stokId;
    this.data.miktar = this.frm.value.miktar;

    this.DepoBazindaStokService.update(this.data, () => {
      this.activeModal.close();
    });
  }

  cikis() {
    this.activeModal.close(false);
  }

  DepoSelectModalComponent: any = DepoSelectModalComponents;
  selectedDepo: any;
  DepoChildFunc(event) {
    this.selectedDepo = event;
  }

  StokSelectModalComponent: any = StokSelectModalComponents;
  selectedStok: any;
  StokChildFunc(event) {
    this.selectedStok = event;
  }
}
