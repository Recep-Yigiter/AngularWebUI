import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsMerkeziComponent } from './is-merkezi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';
import { CreateIsMerkeziComponent } from './create-is-merkezi/create-is-merkezi.component';
import { UpdateIsMerkeziComponent } from './update-is-merkezi/update-is-merkezi.component';
import { DetailIsMerkeziComponent } from './detail-is-merkezi/detail-is-merkezi.component';
import { DesignComponent } from './core/design/design.component';
import { ListIsMerkeziComponent } from './list-is-merkezi/list-is-merkezi.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularSplitModule } from 'angular-split';



@NgModule({
  declarations: [
    IsMerkeziComponent,
    CreateIsMerkeziComponent,
    UpdateIsMerkeziComponent,
    DetailIsMerkeziComponent,
    TabItemComponent, 
    TabMainComponent,
    DesignComponent,
    ListIsMerkeziComponent
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
        path: 'create ', component: CreateIsMerkeziComponent
      },   
      {
        path: 'update ', component: UpdateIsMerkeziComponent
      },
      {
        path: 'detail ', component: DetailIsMerkeziComponent
      },
      {
        path: "list", component: ListIsMerkeziComponent
      }
    ])
  ]
  
})
export class IsMerkeziModule { }
