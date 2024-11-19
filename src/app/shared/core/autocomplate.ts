import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellEditorParams,
} from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankaService } from 'src/app/core/services/repository/banka.service';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'autocomplete',
  styles: [
    `
/* Autocomplete dropdown'ı için stil */
.autocomplete-dropdown {
  position: absolute;  /* Dropdown'ı dışarıya taşır */
  width: 100%;  /* Genişliği input ile aynı yapar */
  max-height: 200px;  /* Maksimum yükseklik */
  overflow-y: auto;  /* Çok fazla öğe olduğunda kaydırılabilir hale gelir */
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  /* Dropdown'a gölge ekler */
  z-index: 9999;  /* Dropdown'ı üstte tutmak için z-index */
  margin-top: 5px;  /* Input ile dropdown arasında boşluk */
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Dropdown öğelerinin stili */
.autocomplete-dropdown li {
  padding: 8px;
  cursor: pointer;
}

/* Hover durumu için stil */
.autocomplete-dropdown li:hover {
  background-color: #f0f0f0;
}

    `,
  ],
  template: `
    <input
      type="text"
      [formControl]="control"
      (input)="onInput($event)"
      placeholder="Start typing..."
    />
    <ul
      class="autocomplete-dropdown"
      *ngIf="filteredOptions && filteredOptions.length"
    >
      <li *ngFor="let option of filteredOptions" (click)="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  
  `,
})
export class AutocomplateComponent implements ICellEditorAngularComp {
    @ViewChild('inputRef') inputRef: ElementRef;
    control = new FormControl();
    filteredOptions: string[] = [];
    
    options: string[] = ['Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry', 'Pineapple'];
  
    constructor(private renderer: Renderer2) {}
  
    agInit(params: any): void {
      this.control.setValue(params.value);
      setTimeout(() => {
        this.adjustDropdownPosition();
      }, 0);  // Positionu hemen ayarlamak için
    }
  
    getValue() {
      return this.control.value;
    }
  
    onInput(event: any) {
      const value = event.target.value.toLowerCase();
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(value));
      setTimeout(() => {
        this.adjustDropdownPosition();
      }, 0);  // Pozisyonu her girdi sonrası güncelle
    }
  
    selectOption(option: string) {
      this.control.setValue(option);
      this.filteredOptions = [];
    }
  
    adjustDropdownPosition() {
      if (this.inputRef) {
        const rect = this.inputRef.nativeElement.getBoundingClientRect();
        const dropdown = document.querySelector('.autocomplete-dropdown');
        if (dropdown) {
          dropdown.setAttribute('style', `top: ${rect.bottom + window.scrollY}px; left: ${rect.left + window.scrollX}px;`);
        }
      }
    }
  }