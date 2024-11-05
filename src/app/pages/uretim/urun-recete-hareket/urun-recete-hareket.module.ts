import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrunReceteHareketComponent } from './urun-recete-hareket.component';
import { CreateUrunReceteHareketComponent } from './create-urun-recete-hareket/create-urun-recete-hareket.component';
import { UpdateUrunReceteHareketComponent } from './update-urun-recete-hareket/update-urun-recete-hareket.component';
import { ListUrunReceteHareketComponent } from './list-urun-recete-hareket/list-urun-recete-hareket.component';
import { DesignComponent } from './core/design/design.component';
import { UrunReceteHareketFormLabelComponent } from './core/components/urun-recete-hareket-form-label';
import { UrunReceteHareketFormDateComponent } from './core/components/urun-recete-hareket-form-date';
import { UrunReceteHareketFormInputSelectComponent } from './core/components/urun-recete-hareket-form-input-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularSplitModule } from 'angular-split';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UrunReceteHareketComponent,
    CreateUrunReceteHareketComponent,
    UpdateUrunReceteHareketComponent,
    ListUrunReceteHareketComponent,
    DesignComponent,
    UrunReceteHareketFormLabelComponent,
    UrunReceteHareketFormDateComponent,
    UrunReceteHareketFormInputSelectComponent
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
  ]
})
export class UrunReceteHareketModule { }
