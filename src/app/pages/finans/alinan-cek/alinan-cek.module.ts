import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlinanCekComponent } from './alinan-cek.component';
import { ListAlinanCekComponent } from './list-alinan-cek/list-alinan-cek.component';
import { CreateAlinanCekComponent } from './create-alinan-cek/create-alinan-cek.component';
import { UpdateAlinanCekComponent } from './update-alinan-cek/update-alinan-cek.component';
import { DetailAlinanCekComponent } from './detail-alinan-cek/detail-alinan-cek.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { MatRadioModule } from '@angular/material/radio';
import { AngularSplitModule } from 'angular-split';
import { DesignComponent } from './core/design/design.component';
import { AlinanCekFormLabelComponent } from './core/components/alinan-cek-form-label';
import { AlinanCekFormDateComponent } from './core/components/alinan-cek-form-date';
import { AlinanCekFormInputSelectComponent } from './core/components/alinan-cek-form-input-select';



@NgModule({
  declarations: [
    AlinanCekComponent,
    ListAlinanCekComponent,
    CreateAlinanCekComponent,
    UpdateAlinanCekComponent,
    DetailAlinanCekComponent,
    DesignComponent,
    AlinanCekFormLabelComponent,
    AlinanCekFormDateComponent,
    AlinanCekFormInputSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ButtonModule,
    MatRadioModule,
    AngularSplitModule,

    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([

      { path: "list", component: ListAlinanCekComponent, canActivate: [authGuard] },
      { path: "create", component: CreateAlinanCekComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateAlinanCekComponent, canActivate: [authGuard] },
      { path: "detail", component: DetailAlinanCekComponent, canActivate: [authGuard] },

    ])
  ]
})
export class AlinanCekModule { }
