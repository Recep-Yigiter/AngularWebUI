import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirimComponent } from './birim.component';
import { CreateBirimComponent } from './create-birim/create-birim.component';
import { UpdateBirimComponent } from './update-birim/update-birim.component';
import { DetailBirimComponent } from './detail-birim/detail-birim.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { ListBirimComponent } from './list-birim/list-birim.component';
import { DesignComponent } from './core/design/design.component';
 
import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    BirimComponent,
    CreateBirimComponent,
    UpdateBirimComponent,
    DetailBirimComponent,
    ListBirimComponent,

    DesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    AngularSplitModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
        {
            path: 'create', component: CreateBirimComponent, canActivate: [authGuard]
        },
        {
            path: 'detail', component: DetailBirimComponent, canActivate: [authGuard]
        },
        {
            path: 'update', component: UpdateBirimComponent, canActivate: [authGuard]
        },
        {
            path: "list", component: ListBirimComponent, canActivate: [authGuard]
        }
    ]),
  
]
  
})
export class BirimModule { }
