/**
 * The main component that renders single TabComponent
 * instances.
 */

import { Component, ContentChildren, QueryList, AfterContentInit, } from '@angular/core';
import {  Input } from '@angular/core';




@Component({
    selector: 'tab-item',
    styles: [` `],
    template: `
    <div [hidden]="!active" >
      <ng-content></ng-content>
    </div>
  `
})
export class StokTabItem {
    @Input('tabTitle') title: string;
    @Input() active = false;
}





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
    ],
})
export class StokTabMain implements AfterContentInit {

    @ContentChildren(StokTabItem) tabs: QueryList<StokTabItem>;


    ngAfterContentInit() {

        let activeTabs = this.tabs.filter((tab) => tab.active);


        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: any) {
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
    }
}






