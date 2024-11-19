import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlisIrsaliyeComponent } from './detail-alis-irsaliye.component';

describe('DetailAlisIrsaliyeComponent', () => {
  let component: DetailAlisIrsaliyeComponent;
  let fixture: ComponentFixture<DetailAlisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAlisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(DetailAlisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
