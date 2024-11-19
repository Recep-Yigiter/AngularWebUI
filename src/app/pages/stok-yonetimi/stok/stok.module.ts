import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StokComponent } from './stok.component';
import { RouterModule } from '@angular/router';
import { CreateStokComponent } from './create-stok/create-stok.component';
import { ListStokComponent } from './list-stok/list-stok.component';
import { UpdateStokComponent } from './update-stok/update-stok.component';
import { StokDesignComponent } from './core/stok-design/stok-design.component';
import { AsyncPipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MatListModule } from '@angular/material/list';
import { AngularSplitModule } from 'angular-split';
import { StokFormLabelComponent } from './core/components/stok-form-label';
import { StokFormDateComponent } from './core/components/stok-form-date';
import { StokFormInputSelectComponent } from './core/components/stok-form-input-select';
import { StokFormDropDownComponent } from './core/components/stok-form-dropdown';
import {TableModule} from 'primeng/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HesapPlaniSelectComponent } from './core/components/hesap-plani-select';
import { AgGridAutoCompleteComponent } from './core/components/auto-complete';
@NgModule({
  declarations: [
    StokComponent,
    CreateStokComponent,
    ListStokComponent,
    UpdateStokComponent,
    StokDesignComponent,
    AgGridAutoCompleteComponent,
    HesapPlaniSelectComponent,
    StokFormDateComponent,
    StokFormDropDownComponent,
    StokFormInputSelectComponent,
    StokFormLabelComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    AgGridAngular,
    AccordionModule,
    ListboxModule,
    DividerModule,
    DropdownModule,
    CheckboxModule,
    MatListModule,
    TableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatAutocompleteModule,
    
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    AngularSplitModule,








    RouterModule.forChild([
      { path: 'create', component: CreateStokComponent },
      { path: 'update', component: UpdateStokComponent },
      { path: 'list', component: ListStokComponent },


    ])
  ]
})
export class StokModule { }
