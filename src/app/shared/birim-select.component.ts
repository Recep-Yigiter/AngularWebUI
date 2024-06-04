import { ChangeDetectorRef, Component, Injectable, Input, OnInit } from '@angular/core';
import { BirimService } from '../core/services/repository/birim.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export enum CategoryEnum {

    YariMamul = 1,
    Hammadde = 2,
  
  }
export const CategoryMapping = [
    { value: CategoryEnum.YariMamul, type: 'YariMamul' },
    { value: CategoryEnum.Hammadde, type: 'Hammadde' },
  
  ];
@Injectable({
    providedIn: 'root',
})
@Component({
    selector: 'birim-select',
    standalone:true,
    template:`
            <select
                    class="form-select shadow-none"
                    aria-label="Default select example">
                    <option *ngFor="let category of data" [ngValue]="category">{{category.ad}}</option>
            </select>
    `,
    imports:[ReactiveFormsModule]
})
export class BirimSelect implements OnInit {
    @Input() formControlNames: any;
    @Input() selectedValue: any;
    data:any[];
    public categoryTypes: any;
    constructor(private ref: ChangeDetectorRef,private BirimService:BirimService) {

      
    }
   async ngOnInit() {
        this.data=(await this.BirimService.list(()=>{})).items;

        this.categoryTypes = this.data;
        this.selectedValue = this.categoryTypes[0];

    }

    ngAfterContentChecked() {
        this.ref.detectChanges();
    }

    changeValue() {
     
    }



}
