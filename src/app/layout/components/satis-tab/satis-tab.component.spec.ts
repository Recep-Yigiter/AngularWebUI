import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisTabComponent } from './satis-tab.component';

describe('SatisTabComponent', () => {
  let component: SatisTabComponent;
  let fixture: ComponentFixture<SatisTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisTabComponent]
    });
    fixture = TestBed.createComponent(SatisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
