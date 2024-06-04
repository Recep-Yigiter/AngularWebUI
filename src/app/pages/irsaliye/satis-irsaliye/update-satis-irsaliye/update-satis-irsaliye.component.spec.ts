import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSatisIrsaliyeComponent } from './update-satis-irsaliye.component';

describe('UpdateSatisIrsaliyeComponent', () => {
  let component: UpdateSatisIrsaliyeComponent;
  let fixture: ComponentFixture<UpdateSatisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSatisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(UpdateSatisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
