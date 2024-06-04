import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlisIrsaliyeComponent } from './create-alis-irsaliye.component';

describe('CreateAlisIrsaliyeComponent', () => {
  let component: CreateAlisIrsaliyeComponent;
  let fixture: ComponentFixture<CreateAlisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(CreateAlisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
