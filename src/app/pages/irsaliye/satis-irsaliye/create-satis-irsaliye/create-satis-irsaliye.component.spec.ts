import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSatisIrsaliyeComponent } from './create-satis-irsaliye.component';

describe('CreateSatisIrsaliyeComponent', () => {
  let component: CreateSatisIrsaliyeComponent;
  let fixture: ComponentFixture<CreateSatisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSatisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(CreateSatisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
