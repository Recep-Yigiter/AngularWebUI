import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StokComponent } from './stok.component';
import { CreateStokComponent } from './create-stok/create-stok.component';
import { UpdateStokComponent } from './update-stok/update-stok.component';
import { ListStokComponent } from './list-stok/list-stok.component';


import { CurrencyPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';

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
import { AppTableComponent } from './components/app-table/app-table.component';
import { InputTrComponent } from './components/input-tr/input-tr.component';
import { TitleInputTrComponent } from './components/title-input-tr/title-input-tr.component';
import { DetailStokComponent } from './detail-stok/detail-stok.component';
import { DetailStokActionsComponent } from './detail-stok-actions/detail-stok-actions.component';
import { SelectTrComponent } from './components/select-tr/select-tr.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';
import { CurrencyInputDirective } from './components/currency-input.directive';
import { DesignComponent } from './core/design/design.component';
import { StokTabItem, StokTabMain } from 'src/app/shared/components/tabs/stok-tab';
import { AngularSplitModule } from 'angular-split';
@NgModule({
  declarations: [
    StokComponent,
    CreateStokComponent,
    UpdateStokComponent,
    ListStokComponent,
    DetailStokComponent,
    DetailStokActionsComponent,
    CreateStokComponent,
    CurrencyInputDirective,

    
    AppTableComponent,
    InputTrComponent,
    SelectTrComponent,
    TitleInputTrComponent,
    DesignComponent,

    StokTabItem,
    StokTabMain
  
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    AngularSplitModule,

    RouterModule.forChild([
      { path: 'create', component: CreateStokComponent, canActivate: [authGuard] },
      { path: 'update', component: UpdateStokComponent, canActivate: [authGuard] },
      { path: 'detail', component: DetailStokComponent, canActivate: [authGuard] },
      { path: 'list', component: ListStokComponent, canActivate: [authGuard] },
      { path: 'detail-stok-actions', component: DetailStokActionsComponent, canActivate: [authGuard] },


    ])

    
  ]
})
export class StokModule { }
