import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { ItemTabComponent } from '../item-tab/item-tab.component';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss']
})
export class MainTabComponent implements AfterContentInit {
  @ContentChildren(ItemTabComponent) tabs: QueryList<ItemTabComponent>;
  constructor() {

  }

  ngAfterContentInit() {
    let selectedIndex: number =  parseInt(localStorage.getItem('selectedTabIndex'))  || 0;
    this.selectTab(this.tabs.toArray()[selectedIndex]);

  }

  selectTab(tab: ItemTabComponent) {
 
    this.tabs.toArray().forEach(tab => (tab.active = false));
    let selectedIndex: number = this.tabs.toArray().indexOf(tab);
    localStorage.setItem('selectedTabIndex',selectedIndex.toString());
    tab.active = true;
  }
}