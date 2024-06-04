import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlisIrsaliyeComponent } from './update-alis-irsaliye.component';

describe('UpdateAlisIrsaliyeComponent', () => {
  let component: UpdateAlisIrsaliyeComponent;
  let fixture: ComponentFixture<UpdateAlisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAlisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(UpdateAlisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
