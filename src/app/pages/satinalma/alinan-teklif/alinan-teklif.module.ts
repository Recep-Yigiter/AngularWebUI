import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlinanTeklifComponent } from './alinan-teklif.component';
import { CreateAlinanTeklifComponent } from './create-alinan-teklif/create-alinan-teklif.component';
import { UpdateAlinanTeklifComponent } from './update-alinan-teklif/update-alinan-teklif.component';
import { DetailAlinanTeklifComponent } from './detail-alinan-teklif/detail-alinan-teklif.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { ListAlinanTeklifComponent } from './list-alinan-teklif/list-alinan-teklif.component';
import { ButtonModule } from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
@NgModule({
  declarations: [
    AlinanTeklifComponent,
    CreateAlinanTeklifComponent,
    UpdateAlinanTeklifComponent,
    DetailAlinanTeklifComponent,
    ListAlinanTeklifComponent,

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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([

      { path: "list", component: ListAlinanTeklifComponent,canActivate:[authGuard]},
      { path: "create", component: CreateAlinanTeklifComponent ,canActivate:[authGuard]},
      { path: "update", component: UpdateAlinanTeklifComponent ,canActivate:[authGuard]},
      { path: "detail", component: DetailAlinanTeklifComponent ,canActivate:[authGuard]},

    ])
  ],


})
export class AlinanTeklifModule { }
