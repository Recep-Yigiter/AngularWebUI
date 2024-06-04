import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHizmetComponent } from './detail-hizmet.component';

describe('DetailHizmetComponent', () => {
  let component: DetailHizmetComponent;
  let fixture: ComponentFixture<DetailHizmetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHizmetComponent]
    });
    fixture = TestBed.createComponent(DetailHizmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
