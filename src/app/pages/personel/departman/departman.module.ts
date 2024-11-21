import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

import {TableModule} from 'primeng/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DepartmanComponent } from './departman.component';
import { CreateDepartmanComponent } from './create-departman/create-departman.component';
import { UpdateDepartmanComponent } from './update-departman/update-departman.component';
import { ListDepartmanComponent } from './list-departman/list-departman.component';
import { DepartmanDesignComponent } from './core/departman-design/departman-design.component';
import { DepartmanFormDateComponent } from './core/components/departman-form-date';
import { DepartmanFormDropDownComponent } from './core/components/departman-form-dropdown';
import { DepartmanFormInputSelectComponent } from './core/components/departman-form-input-select';
import { DepartmanFormLabelComponent } from './core/components/departman-form-label';

@NgModule({
  declarations: [
    DepartmanComponent,
    CreateDepartmanComponent,
    UpdateDepartmanComponent,
    ListDepartmanComponent,
    DepartmanDesignComponent,
    DepartmanFormDateComponent,
    DepartmanFormDropDownComponent,
    DepartmanFormInputSelectComponent,
    DepartmanFormLabelComponent
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
      { path: 'create', component: CreateDepartmanComponent },
      { path: 'update', component: UpdateDepartmanComponent },
      { path: 'list', component: ListDepartmanComponent },


    ])
  ]
})
export class DepartmanModule { }
