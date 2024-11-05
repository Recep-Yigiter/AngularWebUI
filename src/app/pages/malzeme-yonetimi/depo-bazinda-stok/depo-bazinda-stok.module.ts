import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepoBazindaStokComponent } from './depo-bazinda-stok.component';
import { CreateDepoBazindaStokComponent } from './create-depo-bazinda-stok/create-depo-bazinda-stok.component';
import { UpdateDepoBazindaStokComponent } from './update-depo-bazinda-stok/update-depo-bazinda-stok.component';
import { ListDepoBazindaStokComponent } from './list-depo-bazinda-stok/list-depo-bazinda-stok.component';
import { DetailDepoBazindaStokComponent } from './detail-depo-bazinda-stok/detail-depo-bazinda-stok.component';
import { DesignComponent } from './core/design/design.component';
import { DepoBazindaStokFormLabelComponent } from './core/components/depo-bazinda-stok-form-label';
import { DepoBazindaStokFormDateComponent } from './core/components/depo-bazinda-stok-form-date';
import { DepoBazindaStokFormInputSelectComponent } from './core/components/depo-bazinda-stok-form-input-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularSplitModule } from 'angular-split';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';



@NgModule({
  declarations: [
    DepoBazindaStokComponent,
    CreateDepoBazindaStokComponent,
    UpdateDepoBazindaStokComponent,
    ListDepoBazindaStokComponent,
    DetailDepoBazindaStokComponent,
    DesignComponent,
    DepoBazindaStokFormLabelComponent,
    DepoBazindaStokFormDateComponent,
    DepoBazindaStokFormInputSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatCheckboxModule,
    MatBadgeModule,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    AccordionModule,
    ListboxModule,
    RouterModule.forChild([
      {
        path: 'create', component: CreateDepoBazindaStokComponent
      },   
      {
        path: 'update', component: UpdateDepoBazindaStokComponent
      },
      {
        path: 'detail', component: DetailDepoBazindaStokComponent
      },
      {
        path: "list", component: ListDepoBazindaStokComponent
      }
    ])
  ]
})
export class DepoBazindaStokModule { }
