import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrunReceteComponent } from './urun-recete.component';
import { CreateUrunReceteComponent } from './create-urun-recete/create-urun-recete.component';
import { DetailUrunReceteComponent } from './detail-urun-recete/detail-urun-recete.component';
import { UpdateUrunReceteComponent } from './update-urun-recete/update-urun-recete.component';
import { TabMainComponent } from './components/tab-main.component';
import { TabItemComponent } from './components/tab-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StokSelectModalComponent } from './components/stok-select-modal/stok-select-modal.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { OperasyonSelectModalComponent } from './components/operasyon-select-modal/operasyon-select-modal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ListUrunReceteComponent } from './list-urun-recete/list-urun-recete.component';
import { DesignComponent } from './core/design/design.component';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularSplitModule } from 'angular-split';
import { UrunReceteFormDateComponent } from './core/components/urun-recete-form-date';
import { UrunReceteFormLabelComponent } from './core/components/urun-recete-form-label';
import { UrunReceteFormInputSelectComponent } from './core/components/urun-recete-form-input-select';




@NgModule({
  declarations: [
    UrunReceteComponent,
    CreateUrunReceteComponent,
    DetailUrunReceteComponent,
    UpdateUrunReceteComponent,
    TabItemComponent, TabMainComponent,

    StokSelectModalComponent,
    DeleteButtonComponent,
    OperasyonSelectModalComponent,
    ListUrunReceteComponent,
    DesignComponent,
    UrunReceteFormLabelComponent,
    UrunReceteFormDateComponent,
    UrunReceteFormInputSelectComponent
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
    RouterModule.forChild([
      {
        path: 'create', component: CreateUrunReceteComponent
      },   
      {
        path: 'update', component: UpdateUrunReceteComponent
      },
      {
        path: 'detail', component: DetailUrunReceteComponent
      },
      {
        path: "list", component: ListUrunReceteComponent
      }
    ])
  ]
})
export class UrunReceteModule { }
