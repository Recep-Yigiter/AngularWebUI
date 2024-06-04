import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSatisIrsaliyeComponent } from './list-satis-irsaliye.component';

describe('ListSatisIrsaliyeComponent', () => {
  let component: ListSatisIrsaliyeComponent;
  let fixture: ComponentFixture<ListSatisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSatisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(ListSatisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
