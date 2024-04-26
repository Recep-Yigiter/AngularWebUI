import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUretimEmriComponent } from './detail-uretim-emri.component';

describe('DetailUretimEmriComponent', () => {
  let component: DetailUretimEmriComponent;
  let fixture: ComponentFixture<DetailUretimEmriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUretimEmriComponent]
    });
    fixture = TestBed.createComponent(DetailUretimEmriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
