/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
  } from '@angular/core';
  
  import { TabItemComponent } from './tab-item.component';

  
  @Component({
    selector: 'tab-main',
    template: `
      <ul class="nav nav-tabs">
        <li class="nav-item" *ngFor="let tab of tabs" (click)="selectTab(tab)" >
          <a class="nav-link " [class.active]="tab.active">{{tab.title}}</a>
        </li>
      </ul>
      <ng-content></ng-content>
    `,
    styles: [
      `
      .tab-close {
        color: gray;
        text-align: right;
        cursor: pointer;
      }
      `
    ]
  })
  export class TabMainComponent implements AfterContentInit {
    
    @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;
    
    // contentChildren are set
    ngAfterContentInit() {
      // get all active tabs
      let activeTabs = this.tabs.filter((tab)=>tab.active);
      
      // if there is no active tab set, activate the first
      if(activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    }
    
    selectTab(tab: any){
      // deactivate all tabs
      this.tabs.toArray().forEach(tab => tab.active = false);
      
      // activate the tab the user has clicked on.
      tab.active = true;
    }
  }
  