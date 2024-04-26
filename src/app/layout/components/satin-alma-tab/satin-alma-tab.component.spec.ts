import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatinAlmaTabComponent } from './satin-alma-tab.component';

describe('SatinAlmaTabComponent', () => {
  let component: SatinAlmaTabComponent;
  let fixture: ComponentFixture<SatinAlmaTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatinAlmaTabComponent]
    });
    fixture = TestBed.createComponent(SatinAlmaTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
