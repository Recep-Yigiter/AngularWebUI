import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisIrsaliyeComponent } from './satis-irsaliye.component';

describe('SatisIrsaliyeComponent', () => {
  let component: SatisIrsaliyeComponent;
  let fixture: ComponentFixture<SatisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(SatisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
