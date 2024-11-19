import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlisIrsaliyeComponent } from './list-alis-irsaliye.component';

describe('ListAlisIrsaliyeComponent', () => {
  let component: ListAlisIrsaliyeComponent;
  let fixture: ComponentFixture<ListAlisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(ListAlisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
