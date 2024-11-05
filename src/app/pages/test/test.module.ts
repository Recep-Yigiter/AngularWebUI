import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {MatTabsModule} from '@angular/material/tabs';
import { AngularSplitModule } from 'angular-split';
@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    MatTabsModule,
    AngularSplitModule,
  ]
})
export class TestModule { }
