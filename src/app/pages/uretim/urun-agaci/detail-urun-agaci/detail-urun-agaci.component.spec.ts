import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUrunAgaciComponent } from './detail-urun-agaci.component';

describe('DetailUrunAgaciComponent', () => {
  let component: DetailUrunAgaciComponent;
  let fixture: ComponentFixture<DetailUrunAgaciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUrunAgaciComponent]
    });
    fixture = TestBed.createComponent(DetailUrunAgaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
