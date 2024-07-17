import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BirimService } from 'src/app/core/services/repository/birim.service';

@Component({
  selector: 'app-select-tr',
  templateUrl: './select-tr.component.html',
  styleUrls: ['./select-tr.component.scss']
})
export class SelectTrComponent implements OnInit,AfterViewInit {
  @Input() label: any;
  @Input() formControlNames: any;
  @Input() field: any;
  @Input() selectClass: any;
  @Output() public childFunc: EventEmitter<any> = new EventEmitter();
  selectedBirim: any;
  rowData: any[];
  selectedValue: any;
  ValueDataSource: any
  BirimDataSource: any[];



  constructor(private ref: ChangeDetectorRef, private BirimService: BirimService) { }
  ngAfterViewInit(): void {
    this.ref.detectChanges()
  }

  async ngOnInit() {
    this.BirimDataSource = (await this.BirimService.list(() => { })).items;
    this.selectedBirim = this.BirimDataSource[0];
  }



  selectedBirimDropdown(event) {
    
    if (event==undefined) {
      this.selectedBirim=null
    }
    else{
      this.selectedBirim = event;
      this.childFunc.emit(this.selectedBirim)
    }


  }


}
