import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsMerkeziComponent } from './is-merkezi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CreateIsMerkeziComponent } from './create-is-merkezi/create-is-merkezi.component';
import { UpdateIsMerkeziComponent } from './update-is-merkezi/update-is-merkezi.component';
import { DetailIsMerkeziComponent } from './detail-is-merkezi/detail-is-merkezi.component';
import { TabItemComponent } from './components/tab-item.component';
import { TabMainComponent } from './components/tab-main.component';



@NgModule({
  declarations: [
    IsMerkeziComponent,
    CreateIsMerkeziComponent,
    UpdateIsMerkeziComponent,
    DetailIsMerkeziComponent,
    TabItemComponent, 
    TabMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'create-is-merkezi', component: CreateIsMerkeziComponent
      },   
      {
        path: 'update-is-merkezi', component: UpdateIsMerkeziComponent
      },
      {
        path: 'detail-is-merkezi', component: DetailIsMerkeziComponent
      },
      {
        path: "is-merkezi", component: IsMerkeziComponent
      }
    ])
  ]
  
})
export class IsMerkeziModule { }
