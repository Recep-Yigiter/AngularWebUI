import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSatisIrsaliyeComponent } from './detail-satis-irsaliye.component';

describe('DetailSatisIrsaliyeComponent', () => {
  let component: DetailSatisIrsaliyeComponent;
  let fixture: ComponentFixture<DetailSatisIrsaliyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSatisIrsaliyeComponent]
    });
    fixture = TestBed.createComponent(DetailSatisIrsaliyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
