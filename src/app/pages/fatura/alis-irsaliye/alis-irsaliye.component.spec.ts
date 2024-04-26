import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlisIrsaliyeComponent } from './alis-irsaliye.component';

describe('AlisIrsaliyeComponent', () => {
  let component: AlisIrsaliyeComponent;
  let fixture: ComponentFixture<AlisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(AlisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
