import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TediyeComponent } from './tediye.component';
import { CreateTediyeComponent } from './create-tediye/create-tediye.component';
import { UpdateTediyeComponent } from './update-tediye/update-tediye.component';



@NgModule({
  declarations: [
    TediyeComponent,
    CreateTediyeComponent,
    UpdateTediyeComponent
  ],
  imports: [
    CommonModule,
  
  ]
})
export class TediyeModule { }
