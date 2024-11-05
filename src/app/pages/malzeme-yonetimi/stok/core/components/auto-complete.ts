import { Component, AfterViewInit, ViewChild, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER, } from '@angular/material/select';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';

import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';

export function scrollFactory(overlay: Overlay): () => BlockScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

@Component({
	selector: 'auto-complete',
	encapsulation: ViewEncapsulation.None,
    providers: [
        {
          provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
          useFactory: scrollFactory,
          deps: [Overlay],
        },
      ],
       
	host: { style: `position: absolute;
					left: 0px; 
					top: 0px;
					background-color: transparant;
					` },
    template: ` 
	<div class="flex flex-col gap-1">
    <div class="relative">
      <input
        #input
        class="w-full text-xs rounded-md border-gray-300 shadow-sm pr-6"
        matInput
        (input)="onInputChange($event)"
        (change)="onChange($event)"
        [matAutocomplete]="auto"
        [value]="value"
        s1AutocompleteForceSelection
        type="text"
      />
    </div>
    <!-- <mat-autocomplete  #auto="matAutocomplete" (optionSelected)="input.value = $event.option.value"> -->
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="input.value = $event.option.value">
      <mat-divider></mat-divider>
      <mat-option *ngFor="let option of filteredList" [value]="option.value">
        <ng-container>
          <ng-container></ng-container>
        </ng-container>
        <span [title]="option.text" class="text-xs break-words">{{ option.text }} </span>
      </mat-option>
    </mat-autocomplete>
  </div>
	`
})
export class AgGridAutoCompleteComponent implements ICellEditorAngularComp {
    public value: any;
    public filteredList;
    public options;
    private params: any;
  
    public agInit(params: any): void {
      this.params = params;
      this.value = params.value;
      this.options = params.values;
    }
  
    public onInputChange(event: Event): void {
      const inputValue = (event.target as HTMLInputElement).value;
      if (inputValue != null && inputValue != '') {
        const inputValueLowerCase = inputValue.toLowerCase();
        this.filteredList = (this.options || []).filter((element) => {
          return element.text.toLowerCase().includes(inputValueLowerCase);
        });
      } else {
        this.filteredList = [];
      }
    }
  
    public onChange($event) {
      this.value = $event.target.value;
    }
  
    public getValue(): any {
      return this.value;
    }
  }